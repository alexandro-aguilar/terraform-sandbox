
output "config" {
  value = {
    id = "book"
    http = {
      path =  ["book", "{id}"]
      method = "PUT"
      integration: {
          type ="AWS_PROXY",
          behavior = "WHEN_NO_TEMPLATES"
      }
    }
  }
}