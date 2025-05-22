# Practical 6 Reflection 

## Documentation

### Key Concepts Applied:

**Token-based Authentication (JWT):**
- Users receive a signed token upon login.
- The token is used to authenticate protected routes.
  
**Authorization:**
- Middleware ensures only users with required roles can access specific endpoints.
- Roles are stored in the database (USER, ADMIN).

**Password Security:**
- Passwords are hashed using bcrypt before storing.
- Login verifies password with bcrypt's compare method.

**Stateless Backend:**
- JWT enables a completely stateless API (no session stored on server).

## Reflection

### What I Learned
- How to **structure a secure API** with Hono.
- How to **use Prisma to interact with PostgreSQL** effectively.
- How to implement **JWT signing and verification**.
- How to **secure routes** using middleware patterns.
- How to **protect sensitive routes** based on user roles.

### Challenges Faced
#### 1. JWT Errors on Verification
- **Problem:** Passing an expired/invalid token resulted in server crash.
- **Fix:** Wrapped `verifyToken()` in try/catch block and handled 403 response.

#### 2. Role-based Routes not Working
- **Problem:** `requireRole` middleware was skipping due to wrong property in payload.
- **Fix:** Ensured payload had a `role` field and used `c.get("user").role`.

#### 3. Prisma Errors with DB Migrations
- **Problem:** Migration failed due to a typo in enum Role.
- **Fix:** Corrected schema and used `npx prisma migrate reset`.

### Overall Experience
This practical reinforced my understanding of authentication flows, secure coding, and middleware patterns. I now feel confident building full-stack apps with secure login and authorization mechanisms. Using Bun also made the development experience faster and lighter.
