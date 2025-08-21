import express from 'express';
import { generateCode } from '../controllers/codeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/code
// @desc    Generate code
// @access  Private
router.post('/', authMiddleware, generateCode);

export default router;
