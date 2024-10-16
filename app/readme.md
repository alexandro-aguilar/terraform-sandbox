# Middleware RESTFul API

## Architecture

Common request/response path.

```mermaid
sequenceDiagram
    actor User as User
    participant API as API Gateway
    participant Middleware
    Note right of Middleware: Middleware sanitize input request.<br>Required parameters, <br> min/max numeric threshold, <br> min/max string length, <br>etc.
    participant Handler
    Note right of Handler: Entry point
    participant ControllerFactory
    Note right of ControllerFactory: Version handler
    participant Controller
    Note right of Controller: Orchestation
    participant Adapter
    Note right of Adapter: Transform ENTITY to DTO
    participant RequestMapper
    participant ResponseMapper
    participant Infrastructure
    Note right of Infrastructure: Handles Database, Storage, Communication
    participant Usecase
    Note right of Usecase: Businness logic
    participant Repository
    Note right of Repository: ENTITY persistency

    User                ->>+    API: request
    API                 ->>+    Middleware: request
    Middleware          ->>+    Handler: request
    Handler             ->>+    ControllerFactory: request
    ControllerFactory   ->>-    Handler: controller
    Handler             ->>+    Controller: request
    Controller          ->>+    Adapter: request
    Adapter             ->>+    RequestMapper: request
    RequestMapper       ->>-    Adapter: adapted request
    Adapter             ->>+    Infrastructure: adapted request
    Infrastructure      ->>+    Usecase: adapted request
    Usecase             ->>+    Repository: adapted request
    Repository          -->>-   Usecase: response
    Usecase             -->>-   Infrastructure: response
    Infrastructure      -->>-   Adapter: response
    Adapter             -->>+   ResponseMapper: response
    ResponseMapper     -->>-    Adapter: Map response
    Adapter             -->>-   Controller: Convert response to DTO
    Controller          -->>-   Handler: response as DTO
    Handler             -->>-   Middleware: response as DTO
    Middleware          -->>-   API: response as DTO
    API                 -->>-   User: response as DTO
 
```

### Handler

### Controller (Coordinator)

In Clean Architecture, a Controller serves as an intermediary between external requests and the system, orchestrating the interaction between the presentation layer and the inner layers, but without directly handling business logic. Its primary role is to receive requests, invoke the appropriate use cases, and return responses to the users.

### Adapter (Transform ENTITY to DTO)

### Infraestructure (Enable Database, Socket, http, or any other infrastructure required)

### Usecase (Orchestation, Consistency and Businness logic)

### Repository (Persistence layer supported by the infrastructure layer. )
