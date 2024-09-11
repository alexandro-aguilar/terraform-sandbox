resource "aws_api_gateway_resource" "api_domain_path_resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_path_parentId
  path_part   =  var.domain.path
}


locals {
  contexts = {for context in var.domain.contexts : context.id => context}
}


module "domain_context" {
  for_each = local.contexts

  source = "./events"

  module_name = var.module_name 
  
  domain_id = var.domain.id
  context = each.value

  rest_api_id = var.rest_api_id
  rest_api_execution_arn   = var.rest_api_execution_arn
  rest_api_path_parentId   = aws_api_gateway_resource.api_domain_path_resource.id

  bucket_for_code = var.bucket_for_code
 
  lambda_exec_role_arn = var.lambda_exec_role_arn
}

output "api_domain_path_resource_id" {
  value = aws_api_gateway_resource.api_domain_path_resource.id
}

output "domain" {
  value = var.domain
}


output "last" {
  value = module.domain_context
}