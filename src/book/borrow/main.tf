data "archive_file" "example_lambda_archive" {
  type = "zip"

  source_dir  = "../functions"
  output_path = "../dist/lambda_function.zip"
}
