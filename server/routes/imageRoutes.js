import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/image
// @desc    Generate image(s)
// @access  Private
router.post('/', authMiddleware, generateImage);

export default router;
