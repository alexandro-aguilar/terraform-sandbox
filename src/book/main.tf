resource "aws_api_gateway_resource" "book_resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_path_parentId
  path_part   = "book"
}

module "book_borrow" {
  source = "./borrow"
  
  rest_api_id = var.rest_api_id
  rest_api_execution_arn   = var.rest_api_execution_arn
  rest_api_path_parentId   = aws_api_gateway_resource.book_resource.id

  bucket_for_code = var.bucket_for_code
 
  lambda_exec_role_arn = var.lambda_exec_role_arn
}

output "book_resource_id" {
  value = aws_api_gateway_resource.book_resource.id
}