// conversationController.js (Modified)
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const generateConversation = async (req, res) => {
  try {
    const { id: userId } = req.user; // from authMiddleware
    const { messages } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Gemini API Key not configured.' });
    }

    if (!messages) {
      return res.status(400).json({ message: 'Messages are required' });
    }

    // Transform messages to Gemini format
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const { data: result } = await axios.post(geminiApiUrl, { contents });

    if (!result.candidates || result.candidates.length === 0) {
        console.log('[GEMINI_API_ERROR]', result);
        throw new Error('Invalid response from Gemini API');
    }

    const geminiResponse = {
        role: 'assistant',
        content: result.candidates[0].content.parts[0].text
    };

    res.json(geminiResponse);

  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Internal Error' });
  }
};