# Reflection – Practical 1: Designing and Implementing RESTful API Endpoints

## Documentation
In this practical, we explored the design and implementation of RESTful API endpoints using Node.js and Express. The main concepts applied included:

- RESTful routing principles for each resource (Users, Posts, etc.)
- HTTP methods: GET, POST, PUT, DELETE
- Status codes: 200, 201, 400, 404
- Centralized error handling with custom error classes
- Middleware: morgan for logging, cors for cross-origin access, helmet for security
- Content negotiation via Accept headers (JSON, XML support using custom middleware)
- API documentation using static HTML served via Express

We also implemented asynchronous controller functions with error catching to simulate real-world scenarios where I/O operations are involved.

## Reflection
**What I Learned:**
- How to architect a scalable Express project with proper folder structures.

- The importance of using middleware for reusable logic like logging, formatting, and error handling.

- The REST principle of keeping endpoints resource-based and action-agnostic.

- Creating mock data for development without a database.

- Using content negotiation to support various client preferences (e.g., JSON, XML).

**Challenges Faced:**
1. Handling Errors Globally
When I first implemented user deletion, the server crashed if the user ID didn’t exist. Later, I used a global error handler with a custom ErrorResponse utility.

**Solution:**
Added this in middleware/errorHandler.js:
```js
res.status(err.statusCode || 500).json({
  success: false,
  error: err.message || 'Server Error'
});
``` 

2. Content Negotiation Was Ignored Initially
My initial setup returned JSON regardless of the Accept header. I fixed this using formatResponse middleware:

**Solution:**
Added this logic:

```js
if (req.headers.accept === 'application/xml') {
  // convert JSON to XML
}
``` 

### Final Thoughts
This practical gave me a hands-on understanding of what goes into building a production-like API. I feel more confident designing REST APIs from scratch and debugging common middleware issues.