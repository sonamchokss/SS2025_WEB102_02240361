# Practical 3: Secure File Upload System

## Project Overview
A full-stack file upload solution featuring:
- **React/Next.js** frontend with drag-and-drop interface
- **Express.js** backend with Multer middleware
- Secure file validation and storage

## Key Features
**Client-Side**
- Drag-and-drop file uploads
- Progress tracking
- File type/size validation
- PDF/Image previews

**Server-Side**
- Multer middleware for file processing
- MIME type validation
- Size limits (10MB default)
- Secure storage with unique filenames

## Setup Instructions

### Backend (Express)
```bash
git clone https://github.com/syangche/Backend_Practicals.git
cd file-upload-server
npm install
cp .env.example .env
npm start
```
### Frontend (Next.js)
```bash
cd ../frontend
npm install
npm run dev
```

## Configuration
### Environment Variables (.env)
```ini
PORT=8000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760 # 10MB
ALLOWED_TYPES=image/jpeg,image/png,application/pdf
```

## Project Structure
file-upload-server/
├── uploads/           # File storage
├── middleware/
│   └── upload.js      # Multer configuration
└── server.js          # Main server

frontend/
├── components/
│   └── FileDropzone.js
└── pages/upload.js    # Upload interface

## Testing Guide
1. Attempt to upload invalid files (e.g., .exe >10MB)
2. Verify error messages appear
3. Upload valid files and check:
    - Progress bar updates
    - Files appear in /uploads
    - Preview renders correctly