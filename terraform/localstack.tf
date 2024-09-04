# localstack_providers_override.tf

provider "aws" {
  access_key                  = "test"             # Dummy access key
  secret_key                  = "test"             # Dummy secret key
  region                      = var.region        # Región de trabajo
  skip_credentials_validation = true               # Omitir validación de credenciales
  skip_metadata_api_check     = true               # Omitir validación del endpoint metadata
  skip_requesting_account_id  = true               # Omitir la solicitud del ID de cuenta
  s3_use_path_style           = true               # Necesario para la compatibilidad con LocalStack

  endpoints {
    # Define aquí los endpoints de LocalStack para los servicios que necesitas
    apigateway     = var.localstack_endpoint
    cloudformation = var.localstack_endpoint
    cloudwatch     = var.localstack_endpoint
    dynamodb       = var.localstack_endpoint
    ec2            = var.localstack_endpoint
    ecs            = var.localstack_endpoint
    elasticsearch  = var.localstack_endpoint
    firehose       = var.localstack_endpoint
    iam            = var.localstack_endpoint
    kinesis        = var.localstack_endpoint
    lambda         = var.localstack_endpoint
    rds            = var.localstack_endpoint
    redshift       = var.localstack_endpoint
    route53        = var.localstack_endpoint
    s3             = var.localstack_endpoint
    ses            = var.localstack_endpoint
    sns            = var.localstack_endpoint
    sqs            = var.localstack_endpoint
    ssm            = var.localstack_endpoint
    stepfunctions  = var.localstack_endpoint
    sts            = var.localstack_endpoint
  }
}
