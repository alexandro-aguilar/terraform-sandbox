# output "api_gateway_url" {
#   description = "The URL of the API Gateway"
#   value       = "${aws_api_gateway_deployment.example_deployment.invoke_url}/example"
# }

output "api_gateway_id" {
  description = "The API Gateway id"
  value       = "${aws_api_gateway_rest_api.rest_api.id}"
}

output "bucket" {
  description = "The bucket id"
  value       = "${aws_s3_bucket.bucket_for_code.id}"
}

# output "locals" {
#   value = "${local.domains}"
# }
