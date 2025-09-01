import express from 'express';
import { generateVideo } from '../controllers/videoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/video
// @desc    Generate video
// @access  Private
router.post('/', authMiddleware, generateVideo);

export default router;
