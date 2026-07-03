import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { askAiAssistant } from '../services/geminiService.js';

const router = Router();

// Handle AI assistant chatbot queries
router.post('/chat', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message content is required' });
      return;
    }

    const chatHistory = history || []; // array of { role: 'user' | 'model', parts: [{ text: string }] }
    const response = await askAiAssistant(chatHistory, message);

    res.json({ response });
  } catch (err: any) {
    console.error('Chat AI Assistant error:', err);
    res.status(500).json({ error: err.message || 'Error processing AI chat' });
  }
});

export default router;
