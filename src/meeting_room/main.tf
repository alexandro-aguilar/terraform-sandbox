
module "book"{ source = "./book" }
module "cancel" { source = "./cancel" }
module "update" { source = "./update" }


output "config" {
  value = {
    id = "meeting_room"
    source = "/src/meeting_room"
    path = "meeting_rooms"
    contexts = [ 
      module.update.config,
      module.book.config,
      module.cancel.config
     ]
  }
}