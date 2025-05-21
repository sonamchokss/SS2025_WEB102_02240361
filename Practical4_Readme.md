# Practical 4: TikTok Clone with PostgreSQL & Prisma

## Project Overview
Migrated the TikTok clone from in-memory data to a production-ready stack:
- **PostgreSQL** for relational data storage
- **Prisma ORM** for type-safe database access
- **JWT Authentication** with password hashing
- **Seeding script** for test data

## Key Features
**Database Integration**
- 6 relational models (Users, Videos, Comments, etc.)
- ACID transactions
- Complex queries with joins

**Security**
- bcrypt password hashing
- JWT token authentication
- Protected API routes

**Performance**
- Optimized queries
- Indexed relationships
- Connection pooling

## Setup Instructions

### 1. Database Preparation
```bash
sudo -u postgres psql
CREATE DATABASE tiktok_db;
CREATE USER tiktok_user WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE tiktok_db TO tiktok_user;
```

### 2. Backend Configuration
```bash
git clone https://github.com/syangche/TikTok_Server.git
cd TikTok_Server
npm install
cp .env.example .env # Update DATABASE_URL and JWT_SECRET
```

### 3. Database Migration
```bash
npx prisma migrate dev --name init
npm run seed # Populate test data
npm run dev
```

## Prisma Schema Highlights
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  videos    Video[]
  comments  Comment[]
  followers Follow[] @relation("follower")
  following Follow[] @relation("following")
}

model Video {
  id       Int       @id @default(autoincrement())
  url      String
  user     User      @relation(fields: [userId], references: [id])
  userId   Int
  comments Comment[]
  likes    Like[]
}
```

## Testing Guide
1. Authentication Flow
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"test","password":"test123"}'
```

2. Protected Routes
``` bash
curl -X POST http://localhost:5000/api/videos \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"url":"https://example.com/video1"}'
```