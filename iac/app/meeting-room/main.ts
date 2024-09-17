import borrow  from "./booking"
import create  from "./create"



export default {
    id: "book",
    path: ["books"],
    description: "Book API",

    context: [ borrow, create ]
}
