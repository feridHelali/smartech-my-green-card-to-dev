# REST API Design Cheat Sheet

## REST Constraints
1. **Client-Server**: UI and data store are decoupled
2. **Stateless**: Each request carries all its context; no session state server-side
3. **Cacheable**: Responses must declare themselves cacheable or not
4. **Uniform Interface**: Consistent resource identification, manipulation via representations
5. **Layered System**: Client doesn't know if it's talking to the real server or a proxy
6. **Code on Demand** (optional): Server can send executable code

## Resource Naming
```
# Nouns, plural, lowercase, hyphens
GET /users
GET /blog-posts
GET /users/42/orders

# Avoid verbs in URLs (use HTTP method instead)
❌ GET /getUser
❌ POST /createOrder
✓  GET /users/:id
✓  POST /orders

# Filtering, sorting, pagination via query string
GET /users?role=admin&sort=name&order=asc&page=2&limit=20
```

## CRUD → HTTP Mapping
```
Create  → POST   /resources        → 201 Created
Read    → GET    /resources        → 200 OK
Read    → GET    /resources/:id    → 200 OK | 404 Not Found
Update  → PUT    /resources/:id    → 200 OK (full replace)
Update  → PATCH  /resources/:id    → 200 OK (partial)
Delete  → DELETE /resources/:id    → 204 No Content | 404
```

## Response Envelope (standard)
```json
// Success list
{
  "data": [ { "id": "1", "name": "Alice" } ],
  "meta": { "total": 100, "page": 1, "limit": 20 }
}

// Success single
{
  "data": { "id": "1", "name": "Alice" }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [{ "field": "email", "issue": "required" }]
  }
}
```

## Authentication Patterns
```
# API Key (simple, server-to-server)
Authorization: ApiKey abc123

# Bearer Token (JWT)
Authorization: Bearer eyJhbGci...

# Basic Auth (base64 encoded user:pass — only over HTTPS)
Authorization: Basic dXNlcjpwYXNz
```

## JWT Structure
```
header.payload.signature

# Payload example
{
  "sub": "user_id_123",
  "role": "admin",
  "iat": 1700000000,
  "exp": 1700604800
}
```

## Versioning Strategies
```
# URL versioning (most common)
/api/v1/users
/api/v2/users

# Header versioning
Accept: application/vnd.myapi.v2+json

# Query param (avoid — pollutes caching)
/users?version=2
```

## Pagination
```
# Offset-based
GET /users?page=3&limit=20
# Response
{ "data": [...], "meta": { "total": 200, "page": 3, "limit": 20 } }

# Cursor-based (better for large/realtime datasets)
GET /users?after=cursor_abc&limit=20
# Response
{ "data": [...], "meta": { "nextCursor": "cursor_xyz", "hasMore": true } }
```

## Common Status Codes for REST
| Scenario | Code |
|---|---|
| Resource created | 201 |
| Async operation accepted | 202 |
| Deleted successfully | 204 |
| Validation failed | 400 |
| Missing/invalid auth token | 401 |
| Valid token, insufficient permissions | 403 |
| Resource not found | 404 |
| Method not allowed | 405 |
| Conflict (duplicate, state issue) | 409 |
| Rate limit exceeded | 429 |

## HATEOAS (hypermedia links)
```json
{
  "data": { "id": "1", "name": "Alice" },
  "links": {
    "self": "/users/1",
    "orders": "/users/1/orders",
    "delete": "/users/1"
  }
}
```

## OpenAPI / Swagger Skeleton
```yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: role
          in: query
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/User' }
components:
  schemas:
    User:
      type: object
      properties:
        id: { type: string }
        name: { type: string }
        email: { type: string }
```
