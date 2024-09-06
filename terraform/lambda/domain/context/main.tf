locals {
  api_config_file_path = "/src/${var.domain}/${var.context}/api.config.json"
  api_config = jsondecode(file(local.api_config_file_path))
}

locals {
  function_name = "${var.module_name}_${var.domain}_${var.context}"
  lambda_name = "${var.domain}.${var.context}"
  lambda_file_name = "${local.lambda_name}.zip"
  lambda_bundle = "../.dist/bundle/${local.lambda_file_name}"
}

resource "aws_api_gateway_resource" "domain_context_resource" {

  for_each = toset(api_config.events.http.path)

  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_path_parentId
  path_part   = each.key
}

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

# Triggers / Events

## Http -begins
resource "aws_api_gateway_method" "rest_api_http_method" {
  rest_api_id   = var.rest_api_id
  resource_id   = aws_api_gateway_resource.domain_context_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "rest_api_http_integration" {
  rest_api_id = var.rest_api_id
  resource_id = aws_api_gateway_resource.domain_context_resource.id
  http_method   = aws_api_gateway_method.rest_api_http_method.http_method
  
  type        = "AWS_PROXY"
  uri         = aws_lambda_function.domain_context_lambda.invoke_arn

  integration_http_method = "POST"

  passthrough_behavior = "WHEN_NO_TEMPLATES"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.domain_context_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.rest_api_execution_arn}/*/*"
}
## Httpp -end



resource "aws_cloudwatch_log_group" "cloudwatch-lambda-logs" {
  name = "/aws/lambda/${aws_lambda_function.domain_context_lambda.function_name}"
  retention_in_days = 30
}

