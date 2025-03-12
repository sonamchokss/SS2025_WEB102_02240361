const dataStore = require('../models');

// GET all comments
const getAllComments = (req, res) => {
  res.status(200).json(dataStore.comments);
};

// GET comment by ID
const getCommentById = (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = dataStore.comments.find(c => c.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  res.status(200).json(comment);
};

// POST create a new comment
const createComment = (req, res) => {
  const { userId, videoId, text } = req.body;

  // Basic validation
  if (!userId || !videoId || !text) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  // Check if user and video exist
  const userExists = dataStore.users.some(user => user.id === parseInt(userId));
  const videoExists = dataStore.videos.some(video => video.id === parseInt(videoId));
  if (!userExists || !videoExists) {
    return res.status(404).json({ error: 'User or video not found' });
  }

  const newComment = {
    id: dataStore.nextIds.comments++,
    userId: parseInt(userId),
    videoId: parseInt(videoId),
    text,
    createdAt: new Date().toISOString()
  };

  dataStore.comments.push(newComment);

  res.status(201).json(newComment);
};

// PUT update a comment
const updateComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  const commentIndex = dataStore.comments.findIndex(c => c.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const { text } = req.body;
  const comment = dataStore.comments[commentIndex];

  // Update fields if provided
  if (text) comment.text = text;

  comment.updatedAt = new Date().toISOString();

  res.status(200).json(comment);
};

// DELETE a comment
const deleteComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  const commentIndex = dataStore.comments.findIndex(c => c.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // Remove the comment
  dataStore.comments.splice(commentIndex, 1);

  res.status(204).end();
};

// GET comments for a specific video
const getVideoComments = (req, res) => {
    const videoId = parseInt(req.params.videoId);
    const video = dataStore.videos.find(v => v.id === videoId);

    if (!video) {
        return res.status(404).json({ error: 'Video not found' });
    }

    const comments = dataStore.comments.filter(c => c.videoId === videoId);
    res.status(200).json(comments);
};

// GET comments by user
const getUserComments = (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = dataStore.users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const comments = dataStore.comments.filter(c => c.userId === userId);
    res.status(200).json(comments);
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getVideoComments,
  getUserComments
};