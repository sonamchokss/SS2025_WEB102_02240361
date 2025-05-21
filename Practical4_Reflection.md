# Practical 4 Reflection: Database Integration

## Documentation

### Applied Concepts
1. **Relational Modeling:**
- Designed 6 interconnected tables with Prisma
- Implemented self-referential many-to-many for user follows
```prisma
model Follow {
  followerId  Int
  followingId Int
  @@id([followerId, followingId])
}
```

2. **Secure Authentication:**
- bcrypt for password hashing (12 rounds)
- JWT token issuance/validation
- Protected routes middleware 

3. **Performance Optimization:**
- Indexed foreign keys
- Transactional writes for data consistency
```javascript
await prisma.$transaction([...operations]);
```

## Reflection
### Key Learnings
1. **Relational Modeling**
- Many-to-many relationships (Follows)
- Cascading deletes
- Composite primary keys

2. Prisma Advantages
- Type-safe queries
- Intuitive relation queries
- Migration version control

3. Security Practices
- Password hashing (bcrypt)
- JWT best practices
- Environment variable management

### Challenges Faced
**Challenge 1: N+1 Query Problem**
Issue: Loading user videos caused multiple queries
Solution:
```javascript
// Eager loading
const userWithVideos = await prisma.user.findUnique({
  where: { id: userId },
  include: { videos: true }
});
```

**Challenge 2: Transaction Deadlocks**
Issue: Concurrent follow/unfollow operations
Solution:
```javascript
await prisma.$transaction([
  prisma.follow.create({ data: { followerId, followingId } }),
  prisma.user.update({
    where: { id: followerId },
    data: { followingCount: { increment: 1 } }
  })
]);
```

**Challenge 3: Password Hashing Overhead**
Issue: Slow user registration
Solution:
```javascript
// Increased bcrypt rounds balance security vs performance
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

### Future Improvements
1. Performance
- Read replicas for scaling
- Redis caching
- Query optimization

2. Features
- Social graph recommendations
- Video transcoding pipeline
- Full-text search

3. DevOps
- Database backup strategy
- Connection health checks
- Monitoring dashboard

## Conclusion
This migration from in-memory data to PostgreSQL transformed our application's reliability and scalability. The integration of Prisma provided type-safe database access that caught potential errors at compile-time rather than runtime. Most significantly, implementing proper authentication and relationship management has prepared this project for production deployment.