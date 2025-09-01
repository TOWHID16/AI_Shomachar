// videoController.js (Modified)
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generateVideo = async (req, res) => {
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
      "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
      {
        input: {
          prompt: prompt
        }
      }
    );
    
    res.json(response);

  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    res.status(500).json({ message: 'Internal Error' });
  }
};