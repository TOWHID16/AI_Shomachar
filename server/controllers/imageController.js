// imageController.js (Modified)
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (req, res) => {
  try {
    const { id: userId } = req.user; // from authMiddleware
    const { prompt, amount = 1, resolution = "512x512" } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API Key not configured.' });
    }

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }
    if (!resolution) {
        return res.status(400).json({ message: 'Resolution is required' });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    
    res.json(response.data);

  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    res.status(500).json({ message: 'Internal Error' });
  }
};