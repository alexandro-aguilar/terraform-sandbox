import booking  from "./booking"
import create  from "./create"

export default {
    id: "meeting-room",
    path: ["meetings-room"],
    description: "Book API",

    context: [ booking, create ]
}
