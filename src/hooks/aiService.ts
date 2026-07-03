import { supabase } from '../config/supabase';

const getAuthToken = async (): Promise<string | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ?? null;
};

export interface ExtractedSkill {
  name: string;
  level: 'Expert' | 'Senior' | 'Mid-Level' | 'Junior';
}

export interface ParseResult {
  matchPercentage: number;
  skills: ExtractedSkill[];
  summary: string;
}

export const aiService = {
  chatWithAI: async (userPrompt: string, history: Array<{ role: 'user' | 'model'; parts: { text: string }[] }> = []): Promise<string> => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('http://localhost:5000/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userPrompt,
          history
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from AI Assistant');
      }

      const data = await response.json();
      return data.response || 'No response returned from assistant.';
    } catch (err: any) {
      console.error('AI chat assistant failed:', err);
      return `Failed to fetch response: ${err.message || err}. Please confirm your local backend server is running on port 5000.`;
    }
  },

  parseResume: async (file: File): Promise<{ candidate: any; isNew: boolean }> => {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch('http://localhost:5000/api/candidates/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(err.error || 'Failed to parse resume');
    }

    return await response.json();
  },

  applyAndScoreCandidate: async (candidateId: string, jobId: string): Promise<any> => {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`http://localhost:5000/api/candidates/${candidateId}/apply-and-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ jobId })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Evaluation failed' }));
      throw new Error(err.error || 'Failed to evaluate candidate against job');
    }

    return await response.json();
  }
};
export default aiService;
