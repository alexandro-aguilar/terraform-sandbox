
output "config" {
  value = {
    id = "create"
    http = {
      path =  ["create"]
      method = "POST"
      integration: {
          type ="AWS_PROXY",
          behavior = "WHEN_NO_TEMPLATES"
      }
    }
  }
}