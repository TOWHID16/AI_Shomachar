// musicController.js (Modified)
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generateMusic = async (req, res) => {
  try {
    const { id: userId } = req.user; // from authMiddleware
    const { prompt } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
        return res.status(500).json({ message: 'Replicate API Token not configured.' });
    }

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );
    
    res.json(response);

  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    res.status(500).json({ message: 'Internal Error' });
  }
};