module "books" { source = "./book" }
#module "meetingsRoom" { source = "../src/meeting_room" }

output "config" {
  value = {
    id = "library",
    "api": {
      "rest_api_id": "library",
      "name": "Library",
      "description": "Library API",
      "version": "1.0.0",
      "endpointConfiguration": {
        "types": ["REGIONAL"]
      }
    }
    domains =  {
      "books" = module.books.config
      # module.meetingsRoom
    }
  }
}
