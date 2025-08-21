import express from 'express';
import { generateMusic } from '../controllers/musicController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/music
// @desc    Generate music
// @access  Private
router.post('/', authMiddleware, generateMusic);

export default router;
