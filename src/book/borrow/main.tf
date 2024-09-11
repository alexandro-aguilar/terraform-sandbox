
output "config" {
  value = {
    id = "borrow"
    http = {
      #path   = ["{id}"]
      #path   = ["category","{categoryId}"]
      path   = ["category","{categoryId}", "vendor", "{vendorId}", "all"]
      method = "GET"
      integration = {
        type     = "AWS_PROXY",
        behavior = "WHEN_NO_TEMPLATES"
      }
    }
  }
}
