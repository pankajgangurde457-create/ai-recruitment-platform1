import { supabase } from '../config/supabaseClient.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience_years: number;
  education: string;
  summary: string;
}

export interface ScoreResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skill_gap: string[];
}

// Log AI calls to the database
async function logAiRequest(type: string, prompt: string, response: string) {
  try {
    await supabase.from('ai_logs').insert({
      request_type: type,
      prompt,
      response
    });
  } catch (err) {
    console.error('Failed to log AI request:', err);
  }
}

// Call Gemini API via fetch
async function callGemini(prompt: string, expectJson = true): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in the server environment variables.');
  }

  const model = 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const payload: any = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  if (expectJson) {
    payload.generationConfig = {
      responseMimeType: 'application/json'
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API call failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini API returned an empty or invalid content response');
  }

  return text;
}

export async function parseResume(resumeText: string): Promise<ParsedResume> {
  const prompt = `
You are an expert AI Resume Parser. Parse the following resume text and return a valid JSON object matching this TypeScript interface:
interface ParsedResume {
  name: string; // The candidate's full name. If not found, use a reasonable name derived or default.
  email: string; // Contact email. Must be a valid email string format.
  phone: string; // Contact phone.
  skills: string[]; // List of technical or professional skills.
  experience_years: number; // Approximate total years of professional experience as an integer.
  education: string; // Major degrees, schools, or certifications.
  summary: string; // A concise 2-3 sentence executive summary of the candidate's background.
}

Ensure the output is ONLY the JSON object. Do not include markdown code block syntax (like \`\`\`json).

Resume Text:
${resumeText}
`;

  const resultText = await callGemini(prompt, true);
  await logAiRequest('parser', 'Resume parsing request', resultText);
  return JSON.parse(resultText) as ParsedResume;
}

export async function scoreResume(
  candidateSkills: string[],
  experienceYears: number,
  jobTitle: string,
  jobRequirements: string[],
  jobDescription: string
): Promise<ScoreResult> {
  const prompt = `
You are an expert AI Recruiter. Evaluate the candidate's alignment with a job opening.
Candidate Skills: ${JSON.stringify(candidateSkills)}
Candidate Years of Experience: ${experienceYears}
Job Title: ${jobTitle}
Job Requirements: ${JSON.stringify(jobRequirements)}
Job Description: ${jobDescription}

Calculate a match score between 0 and 100 based on their experience and skills compared to the job requirements.
Identify their key strengths for this role, weaknesses/areas of concern, and a list of specific skills they are missing (skill gaps) compared to the requirements.

Return a valid JSON object matching this interface:
interface ScoreResult {
  score: number; // Integer between 0 and 100.
  summary: string; // A 2-3 sentence explanation of the score and match quality.
  strengths: string[]; // List of specific match strengths.
  weaknesses: string[]; // List of gaps, low experience areas, or minor concerns.
  skill_gap: string[]; // List of specific skills required for the job but not present in the candidate profile.
}

Ensure the output is ONLY the JSON object. Do not include markdown code block syntax.
`;

  const resultText = await callGemini(prompt, true);
  await logAiRequest('score', `Scoring for job: ${jobTitle}`, resultText);
  return JSON.parse(resultText) as ScoreResult;
}

export async function generateInterviewQuestions(
  candidateSummary: string,
  candidateSkills: string[],
  jobTitle: string,
  jobDescription: string
): Promise<string[]> {
  const prompt = `
You are an expert interviewer. Generate a list of 5 tailored, behavior-based, and technical interview questions for a candidate applying for the job of "${jobTitle}".
Candidate Summary: ${candidateSummary}
Candidate Skills: ${JSON.stringify(candidateSkills)}
Job Description: ${jobDescription}

Generate questions that explore the candidate's skill alignment and probe their specific background.

Return a valid JSON array of strings: string[]
Ensure the output is ONLY the JSON array. Do not include markdown code block syntax.
`;

  const resultText = await callGemini(prompt, true);
  await logAiRequest('assistant', `Questions for job: ${jobTitle}`, resultText);
  return JSON.parse(resultText) as string[];
}

export async function askAiAssistant(
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> {
  // Simple prompt wrapper
  const historyText = history
    .map(h => `${h.role === 'user' ? 'Recruiter' : 'AI'}: ${h.parts[0].text}`)
    .join('\n');

  const prompt = `
You are HireFlow AI, an elite recruiting assistant. Help the recruiter with their questions about the platform, candidate pipeline, and sourcing strategy. Be concise, helpful, and professional.

Conversation history:
${historyText}

Recruiter: ${newMessage}
AI:`;

  const resultText = await callGemini(prompt, false);
  return resultText;
}
