import { GoogleGenAI, Type } from "@google/genai";
import { Session, InsightResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a sensory pattern analyzer for a private journal called "Lucid Logs".
Analyze the user's cannabis session logs to identify patterns in how different strains, methods, or terpenes affect them.
Your tone is objective, calm, and helpful. 
ABSOLUTELY NO MEDICAL ADVICE. Do not diagnose or treat.
ABSOLUTELY NO SOURCING OR SELLING ADVICE.
Focus on the "Job to be done" (e.g., "You seem to prefer Sativas for creative work").
Keep the response concise and structured.
`;

export const analyzePatterns = async (sessions: Session[]): Promise<InsightResult> => {
  try {
    const sessionSummary = sessions.map(s => ({
      strain: s.strainType,
      method: s.method,
      effects: s.effects,
      notes: s.notes,
      rating: s.rating
    }));

    const prompt = `Analyze these last ${sessions.length} sessions. Provide a summary of what seems to work best for the user, a suggestion for their next session based on high ratings, and a caution based on any negative notes or low ratings.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: JSON.stringify(sessionSummary) + "\n\n" + prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            caution: { type: Type.STRING }
          },
          required: ["summary", "suggestion", "caution"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as InsightResult;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      summary: "Unable to analyze patterns at this time.",
      suggestion: "Try logging more sessions to generate data.",
      caution: "Ensure you are connected to the internet."
    };
  }
};
