# Practical 1 – Designing and Implementing RESTful API Endpoints
This project involves designing and implementing RESTful API endpoints for a simplified Instagram-like social media platform. The goal is to manage resources such as Users, Posts, Comments, Likes, and Followers using Node.js and Express.

## Objectives
- Design RESTful API endpoints following best URI practices.
- Implement endpoints with appropriate HTTP methods and status codes.
- Support content negotiation using MIME types.
- Handle requests and responses properly.
- Provide simple documentation for the API.

## Resources Covered
- Users
- Posts
- Comments
- Likes
- Followers

## RESTful API Endpoint Examples
| Resource | HTTP Method | Endpoint        | Description             |
| -------- | ----------- | --------------- | ----------------------- |
| Users    | GET         | /api/users      | List all users          |
| Users    | GET         | /api/users/\:id | Get user by ID          |
| Users    | POST        | /api/users      | Create a new user       |
| Users    | PUT         | /api/users/\:id | Update an existing user |
| Users    | DELETE      | /api/users/\:id | Delete a user           |

(Similar routes were created for Posts, Comments, Likes, and Followers)

## Project Setup
1. Create directory and initialize Node project:
```bash
mkdir social-media-api
cd social-media-api
npm init -y
```

2. Install dependencies:
```bash
npm install express morgan cors helmet
npm install --save-dev nodemon
```

3. Create folder structure:
```bash
mkdir -p controllers routes middleware config utils public
touch server.js .env .gitignore
```

4. .env:
```ini
PORT=3000
```

5. .gitignore:
```bash
node_modules
.env
.DS_Store
```

6. Add scripts to package.json:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## API Features
- Proper HTTP status codes
- Central error handling
- Async handling for controllers
- MIME-based content negotiation
- Mock data simulation
- HTML API Documentation (docs.html)

## Sample Output
Example: GET /api/users/1 Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "username": "traveler",
    "full_name": "Karma",
    "bio": "Travel photographer",
    "created_at": "2023-01-15"
  }
}
```

## Documentation
Open docs.html in browser or visit http://localhost:3000/docs

## Running the Server
```bash
npm run dev
```