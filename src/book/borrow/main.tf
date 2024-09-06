resource "aws_api_gateway_resource" "book_borrow_resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_path_parentId
  path_part   = "borrow"
}

resource "aws_s3_object" "book_borrow_object" {
  bucket = var.bucket_for_code

  key    = "book.borrow.zip"
  source = "../.dist/bundle/book.borrow.zip"

  etag = filemd5("../.dist/bundle/book.borrow.zip")
}

resource "aws_lambda_function" "book_borrow_lambda" {
  function_name = "book_borrow"
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  s3_bucket = var.bucket_for_code
  s3_key    = aws_s3_object.book_borrow_object.key

  source_code_hash = filebase64sha256("../.dist/bundle/book.borrow.zip")
  role          = var.lambda_exec_role_arn

}

resource "aws_api_gateway_method" "rest_api_httpPost_method" {
  rest_api_id   = var.rest_api_id
  resource_id   = aws_api_gateway_resource.book_borrow_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "rest_api_httpPost_integration" {
  rest_api_id = var.rest_api_id
  resource_id = aws_api_gateway_resource.book_borrow_resource.id
  http_method   = aws_api_gateway_method.rest_api_httpPost_method.http_method
  
  type        = "AWS_PROXY"
  uri         = aws_lambda_function.book_borrow_lambda.invoke_arn

  integration_http_method = "POST"

  passthrough_behavior = "WHEN_NO_TEMPLATES"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.book_borrow_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  #source_arn    = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
  source_arn    = "${var.rest_api_execution_arn}/*/*"
}


resource "aws_cloudwatch_log_group" "cloudwatch-lambda-logs" {
  name = "/aws/lambda/${aws_lambda_function.book_borrow_lambda.function_name}"
  retention_in_days = 30
}
