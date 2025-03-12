const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

// GET all videos
router.get('/api/videos', videoController.getAllVideos);

// POST create a new video
router.post('/api/videos', videoController.createVideo);

// GET video by ID
router.get('/api/videos/:id', videoController.getVideoById);

// PUT update a video
router.put('/api/videos/:id', videoController.updateVideo);

// DELETE a video
router.delete('/api/videos/:id', videoController.deleteVideo);

// GET video comments
router.get('/api/videos/:id/comments', videoController.getVideoComments);

// GET video likes
router.get('/api/videos/:id/likes', videoController.getVideoLikes);

// POST like a video
router.post('/api/videos/:id/likes', videoController.likeVideo);

// DELETE unlike a video
router.delete('/api/videos/:id/likes', videoController.unlikeVideo);

module.exports = router;