# Practical 6 – Authentication & Authorization with Hono, Prisma & PostgreSQL

This practical demonstrates how to implement a secure backend API using:
- Token-based authentication (JWT)
- Password hashing (bcrypt)
- Role-based access control (ADMIN, USER)
- TypeScript + Hono Framework
- PostgreSQL + Prisma ORM

## Folder Structure
practical-6-backend/
├── prisma/
│ └── schema.prisma # Prisma schema
├── src/
│ ├── middlewares/ # Auth middleware
│ ├── routes/ # Auth and protected routes
│ ├── utils/ # JWT and password utils
│ └── index.ts # Main server setup
├── .env
├── package.json
└── tsconfig.json

## Setup Instructions
### 1. Clone and Install
```bash
git clone <repo-url>
cd practical-6-backend
bun install
```

### 2. Configure Environment Variables
Create a .env file:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/practical6
JWT_SECRET=your-super-secret
```

### 3. Migrate Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the Server
```bash
bun run src/index.ts
```

## Auth Endpoints
POST /auth/signup
Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"
}
```

POST /auth/login
Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "JWT_TOKEN"
}
```

## Features Implemented
- User Signup and Login
- JWT-based Session
- Password Hashing with Bcrypt
- Role-based Authorization
- PostgreSQL with Prisma ORM