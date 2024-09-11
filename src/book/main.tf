
module "borrow" { source = "./borrow" }
module "create" { source = "./create" }


output "config" {
  value = {
    id     = "book"
    path   = "books"
    
    source = "/src/book"
    
    contexts = [
      module.borrow.config,
      module.create.config
    ]
  }
}
