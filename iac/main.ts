import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { ApiGatewayRestApi } from '@cdktf/provider-aws/lib/api-gateway-rest-api';
import { ApiGatewayResource } from '@cdktf/provider-aws/lib/api-gateway-resource';
import { ApiGatewayMethod, ApiGatewayMethodConfig } from '@cdktf/provider-aws/lib/api-gateway-method';
import { ApiGatewayIntegration, ApiGatewayIntegrationConfig } from '@cdktf/provider-aws/lib/api-gateway-integration';

import appConfig from "./app/main"
import { DomainEntity } from "./iac-entity"

import * as pathTool from 'path';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { IamPolicy } from '@cdktf/provider-aws/lib/iam-policy';
import { IamRolePolicyAttachment } from '@cdktf/provider-aws/lib/iam-role-policy-attachment';
// Crear el stack principal
class MyStack extends TerraformStack {

  private apiGatewayRestApi: ApiGatewayRestApi = {} as ApiGatewayRestApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    // Definir el proveedor de AWS
    // new AwsProvider(this, 'AWS', {
    //   region: 'us-east-1',
    // });


    new AwsProvider(this, 'AWS', {
      accessKey: 'test',  // Credenciales falsas para LocalStack
      secretKey: 'test',  // LocalStack no valida las credenciales
      region: 'us-east-1',  
      skipCredentialsValidation: true,
      skipRequestingAccountId: true,
      skipMetadataApiCheck: "true",
      endpoints: [
        {
          s3: 'http://localhost:4566',
          apigateway: 'http://localhost:4566',
          cloudwatch: 'http://localhost:4566',
          cloudformation: 'http://localhost:4566',
          dynamodb: 'http://localhost:4566',
          lambda: 'http://localhost:4566',
          rds: 'http://localhost:4566',
          iam: 'http://localhost:4566',
          sns: 'http://localhost:4566',
          sqs: 'http://localhost:4566'
        },
      ]
    });

    let domain: DomainEntity = new DomainEntity();



    // Crear el rol de ejecución de la Lambda
    domain.lambdaExecutionRole = new IamRole(this, "role_lambda_exec", {
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
      role: domain.lambdaExecutionRole.name,
      policyArn: lambdaPolicy.arn,
    });


    // console.log(`appConfig:`, appConfig)

    if (appConfig.apiGateway) {
      this.apiGatewayRestApi = new ApiGatewayRestApi(
        this,
        appConfig.apiGateway.name,
        appConfig.apiGateway);
    }

    appConfig.domains.forEach(domainConfig => {
      // console.log(`domain: ${domain}`, domain)
      this.createDomain(domainConfig, domain);

    });




  }

  private createDomain(domainConfig: any, domain: DomainEntity): void {

    console.log(`domainConfig:`, domainConfig)
    if (domainConfig.context) {
      domainConfig.context.forEach((contextConfig: any) => {
        this.createContext(domainConfig, contextConfig, domain);
      })
    }
  }
  createContext(domainConfig: any, contextConfig: any, domain: DomainEntity): void {
    // console.log(`contextConfig: ${contextConfig}`, contextConfig)

    let currentId = `${domainConfig.id}-${contextConfig.id}`
    // Crear la función Lambda
    let lambdaFunctionName = `${currentId}-lambda`;
    let bundle = pathTool.join(__dirname, `../app/.dist/bundle/${domainConfig.id}.${contextConfig.id}.zip`)


    const myLambda = new LambdaFunction(this, lambdaFunctionName, {
      functionName: lambdaFunctionName,
      handler: 'index.handler',
      runtime: 'nodejs18.x',
      filename: bundle, // Este archivo debe contener tu código empaquetado
      sourceCodeHash: `\${filebase64sha256("${bundle}")}`, // Cambia esto por el hash de tu archivo zip
      role: domain.lambdaExecutionRole.arn, // Reemplaza con el ARN de tu rol Lambda
    });



    if (contextConfig.http) {
      //http Event BEGI]N
      // console.log(`contextConfig.http`,contextConfig.http)

      // console.log(`domain.apiGatewayRootRestApiResource`, domain.apiGatewayRootRestApiResource)

      if (!domain.apiGatewayRootRestApiResource) {
        domain.apiGatewayRootRestApiResource = new ApiGatewayResource(this, domainConfig.id, {
          restApiId: this.apiGatewayRestApi.id,
          parentId: this.apiGatewayRestApi.rootResourceId,
          pathPart: domainConfig.path,
        });

      }

      // console.log(`contextConfig.http.path`,contextConfig.http.path)

      const pathEntries: string[] = contextConfig.http.path;
      // console.log(`pathEntries`,pathEntries)

      let resourceIndex = 1
      let lastApiGatewayResource: ApiGatewayResource = domain.apiGatewayRootRestApiResource;
      // console.log(`lastApiGatewayResource`, lastApiGatewayResource)

      pathEntries.forEach(path => {
        lastApiGatewayResource = new ApiGatewayResource(this, `${currentId}-${resourceIndex++}`, {
          restApiId: this.apiGatewayRestApi.id,
          parentId: lastApiGatewayResource.id,
          pathPart: path,
        });
      });


      let methodConfig: ApiGatewayMethodConfig = {
        restApiId: this.apiGatewayRestApi.id,
        resourceId: lastApiGatewayResource.id,
        authorization: "NONE",
        ...contextConfig.http.method,
      }

      console.log("methodConfig", methodConfig)
      // Crear un método GET/POST/PUT/... para el recurso
      let method: ApiGatewayMethod = new ApiGatewayMethod(this, `${currentId}-method`, methodConfig);


      let methodIntegrationConfig: ApiGatewayIntegrationConfig = {
        restApiId: this.apiGatewayRestApi.id,
        resourceId: lastApiGatewayResource.id,
        httpMethod: method.httpMethod,
        integrationHttpMethod: method.httpMethod,
        type: 'AWS_PROXY',
        uri: myLambda.invokeArn,
        ...contextConfig.http.integration
      }
      console.log("methodIntegrationConfig", methodIntegrationConfig)

      // Crear la integración Lambda para el método GET
      new ApiGatewayIntegration(this, `${currentId}-integration`, methodIntegrationConfig);


      //http Event END
    }



  }
}


const app = new App();
new MyStack(app, appConfig.id);
app.synth();
