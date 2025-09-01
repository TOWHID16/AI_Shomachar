// codeController.js (Modified)
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};

export const generateCode = async (req, res) => {
  try {
    const { id: userId } = req.user; // from authMiddleware
    const { messages } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ message: 'OpenAI API Key not configured.' });
    }

    if (!messages) {
      return res.status(400).json({ message: 'Messages are required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });
    
    res.json(response.choices[0].message);

  } catch (error) {
    console.log('[CODE_ERROR]', error);
    res.status(500).json({ message: 'Internal Error' });
  }
};