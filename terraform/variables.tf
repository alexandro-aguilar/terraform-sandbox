variable "region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "localstack_endpoint" {
  description = "Localstack services enpoint"
  type        = string
  default     = "http://localhost.localstack.cloud:4566"
}