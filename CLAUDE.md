# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack training platform for junior web engineers (MERN stack). The backend is a fully scaffolded REST API; the frontend is a React + TypeScript starter that will grow into a training content delivery app.

## Repository Structure

```
formation_ingenieur_web_dev/
├── backend/        # Express.js REST API (Node.js + MongoDB)
├── webapp/         # React + TypeScript frontend (Vite)
└── designDocs/     # Training materials, sprint docs, PDFs
```

## Commands

### Backend (`cd backend`)

```bash
npm run dev        # Development server with nodemon auto-reload
npm start          # Production server
npm test           # Run Jest test suite (uses in-memory MongoDB)
npm run coverage   # Jest with coverage report
npm run lint       # ESLint (Standard rules, babel-eslint parser)
npm run docs       # Generate API docs with apidoc
```

### Frontend (`cd webapp`)

```bash
npm run dev        # Vite dev server with HMR
npm run build      # TypeScript compile + Vite production build
npm run preview    # Preview the production build locally
```

## Backend Architecture

### Request Flow

```
Client → Express (port 9000/8080) → Passport auth middleware → Route handler → Controller → MongoDB
```

### Authentication System

Four Passport strategies used across routes:
- **Master Key** — Bearer token from `MASTER_KEY` env var; used for service-to-service calls and user creation
- **Basic Auth** — email + password via `POST /auth`
- **JWT Bearer** — `Authorization: Bearer <token>` header or `?access_token=` query param
- **OAuth** — Facebook, GitHub, Google; auto-creates users on first login

### API Endpoints

| Route | Auth |
|---|---|
| `GET /users` | JWT (admin only) |
| `GET /users/me` | JWT |
| `POST /users` | Master key |
| `PUT /users/:id` | JWT (self or admin) |
| `DELETE /users/:id` | JWT (admin) |
| `POST /auth` | Basic |
| `POST /auth/facebook|github|google` | OAuth token |
| `POST /password-resets` | None |
| `PUT /password-resets/:token` | None |

### Data Models (Prisma/SQLite)

**User**: id (UUID), email (unique), bcrypt password, name, picture (Gravatar auto-set), role (`user`|`admin`), `facebookId`/`githubId`/`googleId`.

**PasswordReset**: id (UUID), userId FK, unique token, createdAt — TTL enforced in app layer (1 hour).

### Key Services (`backend/src/services/`)

- `express` — middleware pipeline: SSL force (prod), CORS, compression, morgan, body-parser
- `mongoose` — MongoDB connection
- `passport` — all strategy definitions
- `jwt` — HS256 sign/verify
- `sendgrid` — password reset emails
- `response` — shared HTTP helpers: `success()`, `notFound()`, `authorOrAdmin()`

### Database (Prisma + SQLite)

- Schema: `backend/prisma/schema.prisma`
- Models: `User`, `PasswordReset`
- Client singleton: `backend/src/services/db/index.js`
- `npm run db:migrate` — run pending migrations
- `npm run db:studio` — open Prisma Studio (visual DB browser)
- The `*.db` files are git-ignored; `dev.db` is created on first migrate

### Environment Variables (see `backend/.env.example`)

`MASTER_KEY`, `JWT_SECRET`, `SENDGRID_KEY`, `DATABASE_URL` (e.g. `file:./dev.db`).

## Frontend Architecture

Minimal Vite + React 18 + TypeScript starter. The planned full app targets:
- **Routing**: React Router
- **Data fetching**: TanStack Query
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Diagrams**: Mermaid.js
- Role-based UI (navbar with avatar, sidebar drawer, footer)

## Testing Notes

- Backend tests use `mongodb-memory-server` — no running MongoDB required.
- Test files are colocated with source using `.test.js` suffix.
- After each test suite, collections are cleared automatically.
- Babel transpiles ES6+ for both source and tests (`.babelrc`).
