
locals {
  context_name = var.context.id
  function_name = "${var.module_name}_${var.domain_id}_${local.context_name}"
  lambda_name = "${var.domain_id}.${local.context_name}"
  lambda_file_name = "${local.lambda_name}.zip"
  lambda_bundle = "../.dist/bundle/${local.lambda_file_name}"
}

resource "aws_api_gateway_resource" "api_domain_context" {
  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_path_parentId
  path_part   =  var.context.id
}


# S3 Bucket Object
# Store the lambda code
resource "aws_s3_object" "domain_context_object" {
  bucket = var.bucket_for_code

  key    = local.lambda_file_name
  source = local.lambda_bundle

  etag = filemd5(local.lambda_bundle)
}

resource "aws_lambda_function" "domain_context_lambda" {
  function_name = local.function_name
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  s3_bucket = var.bucket_for_code
  s3_key    = aws_s3_object.domain_context_object.key

  source_code_hash = filebase64sha256(local.lambda_bundle)
  role          = var.lambda_exec_role_arn

}

# Cloudwatch logs
resource "aws_cloudwatch_log_group" "cloudwatch-lambda-logs" {
  name = "/aws/lambda/${aws_lambda_function.domain_context_lambda.function_name}"
  retention_in_days = 30
}



# Triggers / Events


locals {
  httpEvent = contains(keys(var.context), "http") ? toset(["http"]) : toset([])
}
  

module "http" {
  for_each =  local.httpEvent
  source = "./http"

  http = var.context.http
  
  module_name = var.module_name
  
  domain_id = var.domain_id

  rest_api_id = var.rest_api_id
  rest_api_execution_arn   = var.rest_api_execution_arn
  rest_api_path_parentId = aws_api_gateway_resource.api_domain_context.id

  bucket_for_code = var.bucket_for_code
 
  lambda_exec_role_arn = var.lambda_exec_role_arn

 lambda_invoke_arn = aws_lambda_function.domain_context_lambda.invoke_arn
 lambda_function_name = aws_lambda_function.domain_context_lambda.function_name

}

# module "sns" {
#   for_each =  toset ([var.context.http ])
#   source = "./sns"
# }

# module "sqs" {
#   for_each =  toset ([var.context.http ])
#   source = "./sqs"
# }



output "last" {
  value = module.http
}