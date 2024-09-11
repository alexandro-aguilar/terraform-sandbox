

variable "module_name" {
  type = string
}

variable "domain_id" {
  type = string
}

variable "http" {
}

variable "rest_api_id" {
  type = string
}

variable "rest_api_execution_arn" {
  type = string
}

variable "rest_api_path_parentId" {
  type = string
}

variable "bucket_for_code" {
  type = string
}

variable "lambda_exec_role_arn" {
  type = string
}

variable lambda_invoke_arn{}
variable lambda_function_name{}


