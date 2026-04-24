# HTTP Cheat Sheet

## Request Structure
```
METHOD /path HTTP/1.1
Host: example.com
Content-Type: application/json

{ body }
```

## Methods
| Method | Idempotent | Safe | Purpose |
|---|---|---|---|
| GET | ✓ | ✓ | Read resource |
| POST | ✗ | ✗ | Create resource |
| PUT | ✓ | ✗ | Replace resource |
| PATCH | ✗ | ✗ | Partial update |
| DELETE | ✓ | ✗ | Remove resource |
| HEAD | ✓ | ✓ | GET headers only |
| OPTIONS | ✓ | ✓ | List allowed methods |

## Status Codes
| Range | Meaning | Common |
|---|---|---|
| 1xx | Informational | 101 Switching Protocols |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirect | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

## Common Headers
```
# Request
Authorization: Bearer <jwt_token>
Content-Type: application/json
Accept: application/json
Cache-Control: no-cache

# Response
Content-Type: application/json
Set-Cookie: session=abc; HttpOnly; Secure
Access-Control-Allow-Origin: *
ETag: "abc123"
```

## URL Anatomy
```
https://api.example.com:443/users/42?sort=desc&page=1#section
│─────┘ │───────────────┘ │──┘ │────────┘ │────────────────┘ │──────┘
scheme   host             port  path       query              fragment
```

## HTTPS = HTTP + TLS
- TLS handshake establishes encrypted channel before HTTP traffic
- Certificate verifies server identity (CA chain)
- Symmetric key negotiated during handshake, used for bulk encryption

## HTTP/2 vs HTTP/1.1
| Feature | HTTP/1.1 | HTTP/2 |
|---|---|---|
| Multiplexing | ✗ (one req/connection) | ✓ (many streams) |
| Header compression | ✗ | ✓ HPACK |
| Server push | ✗ | ✓ |
| Binary framing | ✗ (text) | ✓ |

## REST Conventions
```
GET    /users          → list all
POST   /users          → create one
GET    /users/:id      → get one
PUT    /users/:id      → replace one
PATCH  /users/:id      → partial update
DELETE /users/:id      → delete one
GET    /users/:id/posts → sub-resource
```
