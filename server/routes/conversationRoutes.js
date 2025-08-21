import express from 'express';
import { generateConversation } from '../controllers/conversationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/conversation
// @desc    Generate conversation
// @access  Private
router.post('/', authMiddleware, generateConversation);

export default router;
