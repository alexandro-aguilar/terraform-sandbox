
locals {
  paths     = var.http.path
  parent_id = var.rest_api_id

  paths_length = length(local.paths)
  paths_count  = length(local.paths) - 1

  resourceA = toset([for idx, path in local.paths : path if idx == 0])
  resourceB = toset([for idx, path in local.paths : path if idx == 1])
  resourceC = toset([for idx, path in local.paths : path if idx == 2])
  resourceD = toset([for idx, path in local.paths : path if idx == 3])
  resourceE = toset([for idx, path in local.paths : path if idx == 4])
  resourceF = toset([for idx, path in local.paths : path if idx == 5])
  resourceG = toset([for idx, path in local.paths : path if idx == 6])

}

resource "aws_api_gateway_resource" "resourceA" {
  for_each = local.resourceA

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id = var.rest_api_path_parentId
}

locals {
  resourcesA    = [for r in aws_api_gateway_resource.resourceA : r != null ? r : { id = 0 }]
  resourcesA_id = local.resourcesA[0].id

}

resource "aws_api_gateway_resource" "resourceB" {
  for_each = local.resourceB

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id = local.resourcesA_id

  depends_on = [aws_api_gateway_resource.resourceA]
}

locals {
  resourcesB    = [for r in aws_api_gateway_resource.resourceB : r != null ? r : { id = 0 }]
  resourcesB_id = length(local.resourcesB) > 0 ? local.resourcesB[0].id : 0
}

resource "aws_api_gateway_resource" "resourceC" {
  for_each = local.resourceC

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id = local.resourcesB_id

  depends_on = [aws_api_gateway_resource.resourceB]
}


locals {
  resourcesC    = [for r in aws_api_gateway_resource.resourceC : r if r != null]
  resourcesC_id = length(local.resourcesC) > 0 ? local.resourcesC[0].id : 0
}

resource "aws_api_gateway_resource" "resourceD" {
  for_each = local.resourceD

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id  = local.resourcesC_id
  depends_on = [aws_api_gateway_resource.resourceC]
}

locals {
  resourcesD    = [for r in aws_api_gateway_resource.resourceD : r if r != null]
  resourcesD_id = length(local.resourcesD) > 0 ? local.resourcesD[0].id : 0
}

resource "aws_api_gateway_resource" "resourceE" {
  for_each = local.resourceE

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id  = local.resourcesD_id
  depends_on = [aws_api_gateway_resource.resourceD]
}

locals {
  resourcesE    = [for r in aws_api_gateway_resource.resourceE : r if r != null]
  resourcesE_id = length(local.resourcesE) > 0 ? local.resourcesE[0].id : 0
}

resource "aws_api_gateway_resource" "resourceF" {
  for_each = local.resourceF

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id  = local.resourcesE_id
  depends_on = [aws_api_gateway_resource.resourceE]
}

locals {
  resourcesF    = [for r in aws_api_gateway_resource.resourceF : r if r != null]
  resourcesF_id = length(local.resourcesF) > 0 ? local.resourcesF[0].id : 0
}

resource "aws_api_gateway_resource" "resourceG" {
  for_each = local.resourceG

  rest_api_id = var.rest_api_id
  path_part   = each.value

  parent_id  = local.resourcesF
  depends_on = [aws_api_gateway_resource.resourceF]
}

locals {
  resourcesG    = [for r in aws_api_gateway_resource.resourceG : r if r != null]
  resourcesG_id = length(local.resourcesG) > 0 ? local.resourcesG[0].id : 0

}

locals {
  resourcesWithEmptyEntries = toset(flatten([
    local.resourcesA,
    local.resourcesB,
    local.resourcesC,
    local.resourcesD,
    local.resourcesE,
    local.resourcesF,
    local.resourcesG,
  ]))

  entries = ["1", "2", "3", "4", "5", "6", "7"]

  last_resourceMap = { for idx, entry in local.entries : (idx == local.paths_count ? "last_resource" : idx) =>

    idx == 0 ? local.resourcesA_id :
    idx == 1 ? local.resourcesB_id :
    idx == 2 ? local.resourcesC_id :
    idx == 3 ? local.resourcesD_id :
    idx == 4 ? local.resourcesE_id :
    idx == 5 ? local.resourcesF_id :
    idx == 6 ? local.resourcesG_id :
    0
  }

  last_resource = local.last_resourceMap["last_resource"]


  # Crear una lista de recursos con el parent_id actualizado
  pathParameters = [
    for path in local.paths : regex("[a-zA-Z0-9]+", path)
    if can(regex("^\\{[a-zA-Z0-9]+\\}$", path))
  ]

  //"
  methodParameters = {
    for param in local.pathParameters : "method.request.path.${param}" => true
  }

  integrationParameters = {
    for param in local.pathParameters : "integration.request.path.${param}" => "method.request.path.${param}"
  }
}

resource "aws_api_gateway_method" "rest_api_http_method" {
  rest_api_id   = var.rest_api_id
  resource_id   = local.last_resource
  http_method   = var.http.method
  authorization = "NONE"

  request_parameters = local.methodParameters
}

resource "aws_api_gateway_integration" "rest_api_http_integration" {

  rest_api_id = var.rest_api_id
  resource_id = local.last_resource
  http_method = aws_api_gateway_method.rest_api_http_method.http_method

  type = var.http.integration.type
  uri  = var.lambda_invoke_arn

  integration_http_method = "POST"
  passthrough_behavior    = var.http.integration.behavior

  request_parameters = local.integrationParameters
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.rest_api_execution_arn}/*/*"
}

output "last" {
  value = local.last_resource
}
output "last_resourceMap" {
  value = local.last_resourceMap
}

