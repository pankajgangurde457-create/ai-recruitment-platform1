const getGeminiApiKey = (): string | null => {
  // Check localStorage first for user-configured keys
  const localKey = localStorage.getItem('gemini_api_key');
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }
  
  // Fall back to environment variables
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim() && envKey !== 'your_gemini_api_key_here') {
    return envKey.trim();
  }
  
  return null;
};

const cleanJsonString = (text: string): string => {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
};

export const callGeminiAPI = async (prompt: string): Promise<string> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error('Invalid response from Gemini API');
    }

    return generatedText;
  } catch (error) {
    console.error('Failed to communicate with Gemini API:', error);
    throw error;
  }
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
  hasKey: (): boolean => {
    return getGeminiApiKey() !== null;
  },

  chatWithAI: async (userPrompt: string): Promise<string> => {
    const systemPrompt = `You are a helpful recruitment AI Assistant embedded in "HireFlow Global AI", a high-end hiring platform. 
Keep your response concise (under 3-4 sentences/bullet points), premium, and actionable. 
You can answer general queries or recruitment advice. If asked about candidates, feel free to analyze or summarize candidate profiles.`;
    
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userPrompt}`;
    try {
      return await callGeminiAPI(fullPrompt);
    } catch (err: any) {
      if (err.message === 'API_KEY_MISSING') {
        return 'Please configure your Google Gemini API Key in the Settings page or the .env file to activate the live AI Assistant.';
      }
      return `Failed to fetch response: ${err.message || err}. Please check your API key and connection.`;
    }
  },

  generateInterviewQuestions: async (
    candidateName: string,
    role: string,
    interviewerName: string
  ): Promise<string[]> => {
    const prompt = `You are a technical recruitment AI. Generate exactly 2 high-quality, targeted interview questions for a candidate.
Candidate Name: ${candidateName}
Target Role: ${role}
Interviewer Name: ${interviewerName}

Return ONLY a JSON array of strings containing the 2 questions. Do not include markdown labels or explanation, just the raw JSON. Example output:
["question 1", "question 2"]`;

    try {
      const rawResponse = await callGeminiAPI(prompt);
      const jsonStr = cleanJsonString(rawResponse);
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return parsed.slice(0, 2);
      }
      return [
        `How would you approach your role as ${role} under the guidance of ${interviewerName}?`,
        `Describe a key project where you demonstrated technical leadership relevant to ${role}.`
      ];
    } catch (err) {
      console.warn('Fallback to standard questions due to error:', err);
      return [
        `How would you integrate our core values into the onboarding of ${role}?`,
        `Describe a time you handled complex requirements as a ${role} with high performance.`
      ];
    }
  },

  parseResume: async (resumeText: string): Promise<ParseResult> => {
    const prompt = `You are an expert ATS (Applicant Tracking System) parser. Analyze the following resume text and extract technical skills and insights in JSON format.
The JSON must strictly have the following structure:
{
  "matchPercentage": number (between 70 and 99),
  "skills": [
    { "name": "skill name", "level": "Expert" | "Senior" | "Mid-Level" | "Junior" }
  ],
  "summary": "Short 1-2 sentence professional summary"
}

Ensure the output contains exactly 3 skills in the list for the UI.
Return ONLY valid JSON. No explanations, no markdown formatting.

Resume Text:
${resumeText}`;

    try {
      const rawResponse = await callGeminiAPI(prompt);
      const jsonStr = cleanJsonString(rawResponse);
      const parsed = JSON.parse(jsonStr) as ParseResult;
      
      if (parsed && typeof parsed.matchPercentage === 'number' && Array.isArray(parsed.skills)) {
        return parsed;
      }
      throw new Error('Invalid parsed structure');
    } catch (err) {
      console.warn('Failed to parse resume text with AI, using fallback:', err);
      return {
        matchPercentage: Math.floor(Math.random() * (99 - 80 + 1)) + 80,
        skills: [
          { name: 'System Design', level: 'Expert' },
          { name: 'Full-Stack Development', level: 'Senior' },
          { name: 'Problem Solving', level: 'Mid-Level' }
        ],
        summary: 'Extracted candidate with solid technical background in software engineering and cloud infrastructure.'
      };
    }
  }
};
