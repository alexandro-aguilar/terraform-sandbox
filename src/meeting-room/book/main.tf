data "archive_file" "example_lambda_archive" {
  type = "zip"

  source_dir  = "../functions"
  output_path = "../dist/lambda_function.zip"
}

resource "null_resource" "transpile_and_zip" {
  provisioner "local-exec" {
    command = <<EOT
      npm run build -- books borrow
    EOT
  }
}