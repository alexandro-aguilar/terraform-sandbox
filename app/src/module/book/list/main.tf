
output "config" {
  value = {
    id = "get-all"
    http = {
      path   = []
      method = "GET"
      integration = {
        type     = "AWS_PROXY",
        behavior = "WHEN_NO_TEMPLATES"
      }
    }
  }
}
