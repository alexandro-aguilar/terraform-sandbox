
output "config" {
  value = {
    id = "update"
    http = {
      path =  ["update", "{id}"]
      method = "POST"
      integration: {
          type ="AWS_PROXY",
          behavior = "WHEN_NO_TEMPLATES"
      }
    }
  }
}