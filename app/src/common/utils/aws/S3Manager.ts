import { S3Client,
  PutObjectCommand,
  GetObjectCommand,
  PutObjectCommandInput,
  ListObjectsV2Command,
  } from '@aws-sdk/client-s3';
import S3Base from './S3Base';
import BucketParams from './BucketParams';

export default class S3Manager implements S3Base {
  s3Client: S3Client;
  bucketParams: BucketParams;

  constructor(bucketName: string, region: string, keyId?: string, accessKey?: string) {
    const configAwsClient = {
      region: region ?? 'us-east-1',
      accessKeyId: keyId,
      secretAccessKey: accessKey,
      apiVersion: '2006-03-01',
      // forcePathStyle : true,
      // endpoint: 'http://localhost:4569',
    };
    this.s3Client = new S3Client(configAwsClient);
    this.bucketParams = {
      Bucket: bucketName,
    };
  }

  async listObjects(prefix: string): Promise<string[]> {
    console.log('S3Manager listObjects');
    const command = new ListObjectsV2Command({
      ...this.bucketParams,
      Prefix: prefix,
      MaxKeys: 1000
    });
    try {
      let isTruncated = true;
      let contents = "";
  
      while (isTruncated) {
        const { Contents = [], IsTruncated = false, NextContinuationToken } = await this.s3Client.send(command);
        const contentsList = Contents.map((c) => `${c.Key}`).join("\n");
        contents += contentsList + "\n";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      return contents.split('\n');
    } catch (error) {
      console.error('S3Manager ListObjects error', error);
      throw error;
    }
  }

  async getObjectFile(path: string): Promise<any> {
    try {
      const command = new GetObjectCommand({
        ...this.bucketParams,
        Key: path,
      });
      const response = await this.s3Client.send(command);

      return await response.Body.transformToString();
    } catch (error) {
      console.error('Error al obtener objeto de S3', error);
      throw error;
    }
  }

  async uploadFiles(port: Omit<PutObjectCommandInput, 'Bucket'>): Promise<any> {
    let success = true;
    try {
      const command = new PutObjectCommand({
        ...this.bucketParams,
        ...port
      });
      await this.s3Client.send(command);
    } catch (error) {
      success = false;
      console.error('Error al subir archivo a S3.', error);
    }
    return success;
  }

  public async streamToString(stream: any): Promise<any> {
    const chunks: string[] = [];
    return new Promise((resolve, reject) => {
      stream.setEncoding('utf8');
      stream.on('data', (chunk: string) => chunks.push(chunk));
      stream.on('error', (err: any) => reject(err));
      stream.on('end', () => resolve(chunks.join('')));
    });
  }
}
