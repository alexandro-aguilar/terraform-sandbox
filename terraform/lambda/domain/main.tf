

locals {
  api_config_file_path = "/src/${var.domain}/api.config.json"
  api_config = jsondecode(file(local.api_config_file_path))
}



resource "aws_api_gateway_resource" "api_domain_path_resource" {
  rest_api_id = var.rest_api_id
  parent_id   = var.rest_api_path_parentId
  path_part   = local.api_config.path
}

module "domain_context" {
  for_each = toset(local.api_config.contexts)

  source = "./context"
  module_name = var.module_name 
  domain = var.domain
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

