# Node.js Observable & Resilient API Boilerplate

Production-ready Node.js REST API template with **Express**, **MongoDB (Mongoose)**, **Redis**, **Sentry**, rate limiting, and centralized error handling. Built for visibility, security, and reliability from day one.

---

## Features

- **Observability** – Sentry integration for error monitoring and unexpected exception reporting
- **Security** – Helmet, CORS, NoSQL injection prevention, HTML input validation
- **Auth** – JWT-based authentication, bcrypt password hashing, password never returned in responses
- **Resilience** – Rate limiting (per-route), overload detection (toobusy), structured error handling
- **Stack** – Express 5, TypeScript, Mongoose, Redis-ready, centralized config via `.env`

---

## Tech Stack

| Layer        | Tech                    |
| ------------ | ------------------------ |
| Runtime     | Node.js                  |
| Framework   | Express 5                |
| Language    | TypeScript               |
| Database    | MongoDB (Mongoose)       |
| Cache       | Redis (ioredis)          |
| Auth        | JWT, bcrypt              |
| Monitoring  | Sentry                   |
| Security    | Helmet, CORS, custom middleware |

---

## Prerequisites

- Node.js (v18+)
- MongoDB
- Redis (optional for current setup; env vars prepared)

---

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/building-observable-nodejs-api.git
cd building-observable-nodejs-api
npm install
```

---

## Environment Variables

Create a `.env` file in the project root (see `.env.example` if available):

| Variable        | Description                | Example                    |
| --------------- | -------------------------- | -------------------------- |
| `PORT`          | Server port                | `3005`                     |
| `MONGGO_URI`    | MongoDB connection string  | `mongodb://localhost:27017/app` |
| `REDIS_HOST`    | Redis host                 | `localhost`                |
| `REDIS_PORT`    | Redis port                 | `6379`                     |
| `REDIS_PASSWORD`| Redis password (optional)  |                            |
| `SENTRY_DSN`    | Sentry project DSN         | `https://xxx@xxx.ingest.sentry.io/xxx` |
| `PRIVATE_KEY`   | JWT signing secret         | your-secret-key            |
| `TOKEN_EXPIRED` | JWT expiry (e.g. `7d`)     | `7d`                       |

### Generate Private Key (for JWT)

Gunakan salah satu cara berikut untuk menghasilkan nilai `PRIVATE_KEY`:

**1. Node.js (random string base64)**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

**2. OpenSSL (random hex)**

```bash
openssl rand -hex 64
```

Salin output ke `.env` sebagai nilai `PRIVATE_KEY`. Jangan commit file `.env` atau share secret ini.

---

## Scripts

| Command     | Description                    |
| ----------- | ------------------------------ |
| `npm run dev`  | Start dev server (nodemon)  |
| `npm run build`| Compile TypeScript to `dist/` |
| `npm start`    | Run production build         |

---

## API Overview

Base path: `/api`

| Method | Path              | Auth   | Description        |
| ------ | ----------------- | ------ | ------------------ |
| POST   | `/api/user/register` | No  | Register user      |
| POST   | `/api/user/login`    | No  | Login, returns JWT  |
| GET    | `/api/user`          | Yes | Get current user    |

**Auth:** Send JWT in header: `Authorization: Bearer <token>`.

Health check: `GET /` returns a simple success message.

---

## Project Structure

```
src/
├── config/          # MongoDB (and optional Redis) connection
├── controllers/     # Request handlers
├── errors/          # HttpError, error states/codes
├── lib/              # Utils (e.g. bcrypt helpers)
├── middlewares/      # Security, auth, error handling
├── models/          # Mongoose models
├── routes/          # Route definitions
├── services/        # JWT, rate limit, etc.
├── types/           # Shared TypeScript types
├── app.ts           # Express app setup
├── env.ts           # Env validation/export
└── server.ts        # Entry point, Sentry init
```

---

## License

ISC · Author: Laskar
