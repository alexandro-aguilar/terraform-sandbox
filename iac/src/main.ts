import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';

import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { ApiGatewayRestApi } from '@cdktf/provider-aws/lib/api-gateway-rest-api';
import { ApiGatewayResource } from '@cdktf/provider-aws/lib/api-gateway-resource';
import { ApiGatewayMethod, ApiGatewayMethodConfig } from '@cdktf/provider-aws/lib/api-gateway-method';
import { ApiGatewayIntegration, ApiGatewayIntegrationConfig } from '@cdktf/provider-aws/lib/api-gateway-integration';

import appConfig from "./app/main"
import IaCRuntime from "./entity/runtime/IaCRuntime"

import * as pathTool from 'path';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { IamPolicy } from '@cdktf/provider-aws/lib/iam-policy';
import { IamRolePolicyAttachment } from '@cdktf/provider-aws/lib/iam-role-policy-attachment';
import { DataAwsApiGatewayRestApi } from '@cdktf/provider-aws/lib/data-aws-api-gateway-rest-api';
import IaCConfig from './entity/config/IaCConfig';
import { IaCResource } from './entity/runtime/IaCApiGatewayRuntime';
import { inject } from 'inversify';
import IaCProvider from './provider/IaCProvider';
import TYPES from './TYPES';
import container from './inversify.config';
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { S3Object } from '@cdktf/provider-aws/lib/s3-object';

// Crear el stack principal
class MyStack extends TerraformStack {

  constructor(
    scope: Construct
    , id: string
    , @inject(TYPES.IaCProvider) provider: IaCProvider
  ) {
    super(scope, id);

    provider.setStack(this);
    // new LocalIaCProvider().setStack(this)

    let runtimeEnv: IaCRuntime = new IaCRuntime()
    

    runtimeEnv.lambdaExecutionRoleArn = this.setLambdaExecutionRoleArn(appConfig);
    let { apiGatewayId, apiGatewayRootResourceId } = this.setApiGateway(appConfig);
    runtimeEnv.apiGateway = {
      id: apiGatewayId,
      rootResourceId: apiGatewayRootResourceId,
      resources: new Map<string, IaCResource>()
    }

    appConfig.domains.forEach(domainConfig => {
      // console.log(`domain: ${domain}`, domain)
      this.createDomain(appConfig, domainConfig, runtimeEnv);

    });
  }


  private setLambdaExecutionRoleArn(config: IaCConfig): string {
    if (config.lambdaExecutionRoleArn) {
      return config.lambdaExecutionRoleArn;
    }
    else {
      // Crear el rol de ejecución de la Lambda
      const lambdaExecutionRole = new IamRole(this, "role_lambda_exec", {
        name: "lambda_exec_role",
        assumeRolePolicy: JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Action: "sts:AssumeRole",
              Principal: {
                Service: "lambda.amazonaws.com",
              },
              Effect: "Allow",
            },
          ],
        }),
      });

      // Crear la política para CloudWatch Logs
      const lambdaPolicy = new IamPolicy(this, "LambdaPolicy", {
        name: "lambda-policy",
        policy: JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
              ],
              Resource: "*", // Ajustar si es necesario
            },
          ],
        }),
      });

      // Adjuntar la política al rol de la Lambda
      new IamRolePolicyAttachment(this, "LambdaRolePolicyAttachment", {
        role: lambdaExecutionRole.name,
        policyArn: lambdaPolicy.arn,
      });

      return lambdaExecutionRole.arn;
    }
  }

  private setApiGateway(config: IaCConfig): { apiGatewayId: string, apiGatewayRootResourceId: string } {
    if (config.apiGatewayConfig) {
      const apiGateway = new ApiGatewayRestApi(
        this,
        config.apiGatewayConfig.name,
        config.apiGatewayConfig);

        new TerraformOutput(this, "Apigateway id", {
          value: apiGateway.id,
          description: "Apigateway id",
        });

        
      return { apiGatewayId: apiGateway.id, apiGatewayRootResourceId: apiGateway.rootResourceId };
    }
    else {
      const apiGateway: DataAwsApiGatewayRestApi = new DataAwsApiGatewayRestApi(this, 'CurrentAPI', {
        name: 'CurrentAPI',
        id: config.apiGatewayId
      });

      return { apiGatewayId: apiGateway.id, apiGatewayRootResourceId: apiGateway.rootResourceId };
    }
  }

  private createDomain(appConfig: IaCConfig, domainConfig: any, runtimeEnv: IaCRuntime): void {

    // console.log(`domainConfig:`, domainConfig)
    if (domainConfig.context) {
      domainConfig.context.forEach((contextConfig: any) => {
        this.createContext(appConfig, domainConfig, contextConfig, runtimeEnv);
      })
    }
  }

  createContext(
    appConfig: IaCConfig,
    domainConfig: any,
    contextConfig: any,
    runtimeEnv: IaCRuntime): void {

    const bucket = this.getBucket(runtimeEnv, domainConfig);

    let currentId = `${domainConfig.id}-${contextConfig.id}`
    // Crear la función Lambda
    let lambdaFunctionName = `${currentId}-lambda`;
    let bundlePath = pathTool.join(__dirname, `../../app/.dist/bundle/${domainConfig.id}.${contextConfig.id}.zip`)

    const s3ObjectForBundle = this.getS3Object(currentId, bundlePath, runtimeEnv)

    const myLambda = new LambdaFunction(this, lambdaFunctionName, {
      functionName: lambdaFunctionName,
      s3Bucket: bucket.bucket,
      s3Key: s3ObjectForBundle.key,

      handler: 'index.main',
      runtime: 'nodejs18.x',
      // filename: bundlePath, // Este archivo debe contener tu código empaquetado
      sourceCodeHash: `\${filebase64sha256("${bundlePath}")}`, // Cambia esto por el hash de tu archivo zip
      role: runtimeEnv.lambdaExecutionRoleArn // Reemplaza con el ARN de tu rol Lambda
      , environment: {
        variables: {
          STAGE: appConfig.stage,
        }
      }
    });

    if (contextConfig.http) {
      //http Event BEGIN


      const pathEntries: string[] = contextConfig.http.path;
      let rootResource: IaCResource = {
        id: runtimeEnv.apiGateway.rootResourceId,
        path: runtimeEnv.apiGateway.rootResourceId,
        children: runtimeEnv.apiGateway.resources
      };

      let resource: IaCResource = this.getResourceId(
        domainConfig.path,
        runtimeEnv.apiGateway.id,
        rootResource);


      pathEntries.forEach(path => {

        resource = this.getResourceId(
          path,
          runtimeEnv.apiGateway.id,
          resource);

      });

      let methodConfig: ApiGatewayMethodConfig = {
        restApiId: runtimeEnv.apiGateway.id,
        resourceId: resource.id,
        authorization: "NONE",
        ...contextConfig.http.method,
      }

      // Crea el método GET/POST/PUT/... para el recurso
      let method: ApiGatewayMethod = new ApiGatewayMethod(this, `${currentId}-method`, methodConfig);

      let { http: { integration = {} } } = contextConfig
      let methodIntegrationConfig: ApiGatewayIntegrationConfig = {
        restApiId: runtimeEnv.apiGateway.id,
        resourceId: resource.id,
        httpMethod: method.httpMethod,
        /**
         * the integrationHttpMethod property in the ApiGatewayIntegration object should always be set to POST. 
         * This is because when API Gateway integrates with Lambda, the communication between API Gateway and 
         * the Lambda function itself is handled via a POST request, regardless of the HTTP method of the 
         * associated ApiGatewayMethod (GET, POST, PUT, etc.).
         */
        integrationHttpMethod: 'POST',
        type: 'AWS_PROXY',
        uri: myLambda.invokeArn,
        ...integration
      }

      // Crea la integración Lambda para el método GET
      new ApiGatewayIntegration(this, `${currentId}-integration`, methodIntegrationConfig);
      //http Event END
    }
  }

  getResourceId(pathPart: string, restApiId: string, resource: IaCResource): IaCResource {

    if (resource.children.has(pathPart)) {
      return resource.children.get(pathPart) as IaCResource;
    }
    else {

      const sanitizedPath = pathPart.replace(/{|}/g, '')
      const id = `${sanitizedPath}`
      const currentResource: ApiGatewayResource = new ApiGatewayResource(this, id, {
        restApiId,
        parentId: resource.id,
        pathPart: pathPart,
      });

      const iacResource: IaCResource = {
        id: currentResource.id,
        path: sanitizedPath,
        children: new Map<string, IaCResource>()
      }
      resource.children.set(pathPart, iacResource)
      return iacResource;
    }
  }

  getBucket(runtimeEnv: IaCRuntime, domainConfig: any): S3Bucket {

    if (!runtimeEnv.lambdaS3Bucket) {
      // Crear un bucket S3
      const bucketName = `LambdaBucket-${domainConfig.id}`.toLowerCase();
      runtimeEnv.lambdaS3Bucket = new S3Bucket(this, bucketName, {
        bucket: bucketName,
      });
    }

    return runtimeEnv.lambdaS3Bucket;


  }

  getS3Object(
    id: string,
    bundlePath: string,
    runtimeEnv: IaCRuntime ): S3Object {

    const bucket = runtimeEnv.lambdaS3Bucket;

    // Subir el archivo zip de la lambda al bucket S3
    const bucketObjectName = `LambdaCode-${id}`.toLowerCase();

    return new S3Object(this, bucketObjectName, {
      bucket: bucket.bucket,
      key: `${bucketObjectName}-code.zip`,
      source: bundlePath,
    });
  }

}


const app = new App();
const provider: IaCProvider = container.get(TYPES.IaCProvider)
new MyStack(app, appConfig.id, provider);
app.synth();


