# Practical 5 Reflection - Supabase Cloud Storage Integration

## Documentation
### Key Concepts Applied
- Transition from local file system to cloud storage
- Supabase bucket creation and policy configuration
- Use of environment variables for API key management
- Integration of Supabase SDK in both frontend (Next.js) and backend (Node.js)
- Prisma schema update for storing storage paths
- Handling direct uploads and metadata storage

## Reflection
### What I Learned
- Supabase provides an intuitive interface and powerful tools for file storage.
- The use of buckets and access policies mimics AWS S3 but with a simpler interface.
- Implementing cloud storage reduced complexity in serving and accessing files across deployments.
- Learned the importance of managing credentials securely using environment variables.

### Challenges Faced

1. Environment Variable Errors  
   Initially, videos were not uploading. After inspection, I realized the `.env` file was missing some keys or had incorrect values.

   Solution: Double-checked API keys from the Supabase dashboard and updated the `.env` file.

2. Broken URLs  
   Some video URLs returned 404 errors after switching to Supabase.

   Solution: Realized the frontend needed to use the full public Supabase storage URL. Fixed it in `VideoCard.jsx`.

3. Migration Script Errors  
   Migrating old videos to Supabase threw file not found errors.

   Solution: Added validation and fallback handling in the migration script.

Overall, this practical helped me understand cloud file storage fundamentals and how to integrate scalable storage in real-world web apps using Supabase.