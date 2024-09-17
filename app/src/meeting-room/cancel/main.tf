
output "config" {
  value = {
    id = "cancel"
    http = {
      path =  ["cancel", "{id}"]
      method = "DELETE"
      integration: {
          type ="AWS_PROXY",
          behavior = "WHEN_NO_TEMPLATES"
      }
    }
  }
}