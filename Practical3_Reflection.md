# Practical 3 Reflection: File Upload System

## Documentation

### Core Implementation
1. **Multer Configuration**
```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) },
  fileFilter: (req, file, cb) => {
    const allowedTypes = process.env.ALLOWED_TYPES.split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});
```

2. **Frontend Integration**
``` javascript
const handleUpload = async (acceptedFiles) => {
  const formData = new FormData();
  formData.append('file', acceptedFiles[0]);

  try {
    const response = await axios.post('/api/upload', formData, {
      onUploadProgress: progress => {
        setUploadPercent(Math.round((progress.loaded * 100) / progress.total));
      }
    });
    setPreview(response.data.filePath);
  } catch (error) {
    setError(error.response?.data?.message || 'Upload failed');
  }
};
```

## Reflection
### Key Learnings
1. **Multipart Form Data**
- FormData API for client-side preparation
- Boundary handling in HTTP requests
- Streaming large files efficiently

2. **Security Practices**
- MIME type verification vs file extensions
- Secure filename generation
- Size limits to prevent DoS attacks

3. **User Experience**
- Progress tracking with Axios interceptors
- Instant validation feedback
- Accessible dropzone interactions

### Challenges Faced
**Challenge 1: File Validation Bypass**
Issue: Users could rename .exe to .pdf
Solution:
```javascript
// Check magic numbers for true file type
const fileType = await FileType.fromFile(file.path);
if (!fileType || !allowedTypes.includes(fileType.mime)) {
  fs.unlinkSync(file.path); // Delete invalid file
  throw new Error('File type mismatch');
}
```

**Challenge 2: Memory Management**
Issue: Large files consuming server memory
Solution:
```javascript
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
// Multer handles files separately
```

**Challenge 3: Cross-Origin Issues**
Issue: Frontend blocked from accessing uploaded files
Solution:
```javascript
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
}));
```

### Future Improvements
1. Advanced Features
- Chunked uploads for >100MB files
- Virus scanning integration
- Cloud storage (S3/Azure Blob)

2. Security Enhancements
- User authentication for uploads
- Signed upload URLs
- Rate limiting

3. Performance
- File compression
- CDN distribution
-Web Workers for processing

## Conclusion
This project deepened my understanding of binary data handling in web applications. The end-to-end implementation—from drag-and-drop UI to secure server storage—provided invaluable experience in managing file uploads at production scale. Most significantly, I learned to balance user convenience with robust security measures.