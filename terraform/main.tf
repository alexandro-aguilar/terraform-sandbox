## :-START >> bucket_for_code
# Bucket to code deploy 

resource "random_string" "bucket_name_postfix" {
  length = 8
  lower  = true
  upper = false
  special = false
}

resource "aws_s3_bucket" "bucket_for_code" {
  bucket = "lambda-${var.module_name}-${random_string.bucket_name_postfix.id}"
  #force_destroy = true
}

resource "aws_s3_bucket_acl" "bucket_for_code_acl" {
  bucket = aws_s3_bucket.bucket_for_code.id
  acl    = "private"
}
## :END << bucket_for_code 

## :-START >> role_lambda_exec
resource "aws_iam_role" "role_lambda_exec" {
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
  role       = aws_iam_role.role_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
## :END << role_lambda_exec

resource "aws_api_gateway_rest_api" "rest_api" {
  name        = "${var.stage}_${var.module_name}_apigw"
  description = "API Gateway for ${var.module_name}"
}


# resource "aws_api_gateway_deployment" "rest_api_stage" {
#   depends_on = [aws_api_gateway_integration.lambda_integration]
#   rest_api_id = aws_api_gateway_rest_api.rest_api.id
#   stage_name  = var.stage
# }

############################################
# Include modules


variable "domains" {
  type = list(string)

  default = [
    "book",
    "meeting_room" //= {domain = "meeting_room", contexts = ["book","cancel", "update"]}
  ]
}


module "domain-modules" {

  for_each = var.domains

  source = "./lambda/domain"

  module_name = var.module_name
  
  domain = each.value.domain
  contexts = each.value.contexts
  
  rest_api_id = aws_api_gateway_rest_api.rest_api.id
  rest_api_execution_arn   = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
  rest_api_path_parentId   = aws_api_gateway_rest_api.rest_api.root_resource_id

  bucket_for_code = aws_s3_bucket.bucket_for_code.bucket
  lambda_exec_role_arn = aws_iam_role.role_lambda_exec.arn
  
}