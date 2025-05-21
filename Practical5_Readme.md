# Practical 5: Implementing Cloud Bucket Storage with Supabase

## Overview
In this practical, we upgrade our TikTok web application by migrating from local file storage to cloud storage using Supabase Storage. This improves scalability, reliability, and access control for user-uploaded content.

## Why Cloud Storage?
### Limitations of Local Storage
1. Limited disk space
2. No shared storage across multiple servers
3. Data loss risk from server crashes or redeployment
4. No CDN benefits
5. Lack of automatic backup

### Benefits of Cloud Storage
- Scalable and cost-effective
- Redundant and secure
- Uses global CDN for better performance
- Advanced access controls

## Supabase Storage: Introduction
- Part of the Supabase ecosystem (PostgreSQL DB, Auth, Edge Functions, etc.)
- Cloud-based file storage with customizable access policies
- Organized into buckets (e.g., videos, thumbnails)

## Step-by-Step Guide
### Part 1: Setting Up Supabase
#### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project with a secure password and region near your audience.

#### Step 2: Create Storage Buckets
- Create two buckets: videos and thumbnails
- Set both to Public access

#### Step 3: Set Policies
- For videos:
  - Allow authenticated users to upload
  - Allow public to view (SELECT operation for anon, authenticated)

Repeat for thumbnails.

### Part 2: Backend Implementation
#### Step 1: Install Supabase Client
```bash
cd server
npm install @supabase/supabase-js
```

#### Step 2: Supabase Client Setup
File: src/lib/supabase.js
``` js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
``` 

#### Step 3: Environment Variables
.env
``` env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_PUBLIC_KEY=your-public-key
SUPABASE_STORAGE_URL=https://your-project-id.supabase.co/storage/v1
```

#### Step 4–6: Update Backend Logic
- Create a storage service: src/services/storageService.js
- Modify videoController.js to use cloud storage for create/delete
- Update Prisma schema with:

``` prisma
videoStoragePath String? @map("video_storage_path")
thumbnailStoragePath String? @map("thumbnail_storage_path")
```

#### Step 7: Migration Script
scripts/migrateVideosToSupabase.js

Migrate local files to Supabase.

### Part 3: Frontend Implementation
#### Step 1: Install Client
```bash
Copy code
cd tiktok_frontend
npm install @supabase/supabase-js
```

#### Step 2: Supabase Client
src/lib/supabase.js
```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase credentials.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
```

#### Step 3: Environment Variables
.env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your-public-key
```

#### Step 4–6: Update Upload and Video Components
- Update uploadService.js
- Modify upload/page.jsx for direct upload
- Update VideoCard.jsx for Supabase URLs

### Part 4: Testing & Deployment
- Run migration script if needed:
```bash
cd server
node scripts/migrateVideosToSupabase.js
```
- Verify all video links
- Clean up local uploads directory