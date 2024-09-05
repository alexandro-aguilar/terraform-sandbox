locals {
  domains = var.domains

}




## :-START >> Lambda deploy

resource "random_string" "lambda_bucket_name" {
  length = 8
  lower  = true
  upper = false
  special = false
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "lambda-bucket-${random_string.lambda_bucket_name.id}"
  force_destroy = true
}

resource "aws_s3_bucket_acl" "lambda_bucket_acl" {
  bucket = aws_s3_bucket.lambda_bucket.id
  acl    = "private"
}

data "archive_file" "example_lambda_archive" {
  type = "zip"

  source_dir  = "../.dist/bundle"
  output_path = "../.dist/lambda_function.zip"
}

resource "aws_s3_object" "lambda_example" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "handler.zip"
  source = data.archive_file.example_lambda_archive.output_path

  etag = filemd5(data.archive_file.example_lambda_archive.output_path)
}


resource "aws_lambda_function" "example_lambda" {
  function_name = "example_lambda"
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_example.key

  source_code_hash = data.archive_file.example_lambda_archive.output_base64sha256

  role          = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      PARAMETER_KEY = "some_value"
    }
  }
}

## :-END << Lambda deploy


resource "aws_cloudwatch_log_group" "example-lambda-logs" {
  name = "/aws/lambda/${aws_lambda_function.example_lambda.function_name}"
  retention_in_days = 30
}


resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


## ---
resource "aws_api_gateway_rest_api" "example_api" {
  name        = "example_api"
  description = "API Gateway for Lambda example"
}

resource "aws_api_gateway_resource" "example_resource" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  parent_id   = aws_api_gateway_rest_api.example_api.root_resource_id
  path_part   = "example"
}

resource "aws_api_gateway_method" "example_method" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.example_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.example_resource.id
  http_method = aws_api_gateway_method.example_method.http_method
  type        = "AWS_PROXY"
  integration_http_method = "POST"
  uri         = aws_lambda_function.example_lambda.invoke_arn

  passthrough_behavior = "WHEN_NO_TEMPLATES"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.example_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.example_api.execution_arn}/*/*"
}

resource "aws_api_gateway_deployment" "example_deployment" {
  depends_on = [aws_api_gateway_integration.lambda_integration]
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  stage_name  = "dev"
}