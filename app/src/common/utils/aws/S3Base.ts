import {
  PutObjectCommandInput
} from '@aws-sdk/client-s3';

export default interface S3Base {
  /**
   * @function getObjectFile
   * @param path {string}
   * @description returns an S3 object
   */
  getObjectFile(port: string): Promise<string>;

  listObjects(prefix: string): Promise<Array<string>>;

  uploadFiles(port: Omit<PutObjectCommandInput, 'Bucket'>): Promise<any>;

}