
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateReflectionQuestion = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class human performance coach and sports physiologist. Based on the following athlete log, generate ONE surgical, biomechanical or physiological question to help them optimize their training or recovery.
      
      Athlete Log: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: 'The performance coaching question.',
            },
          },
          required: ["question"],
        },
      },
    });

    const result = JSON.parse(response.text || '{"question": "How did your perceived exertion match your heart rate data for this session?"}');
    return result.question;
  } catch (error) {
    console.error("Error generating question:", error);
    return "What was the specific technical cue that helped you maintain form during fatigue?";
  }
};

export const generateTrainingProtocol = async (vitals: any, stats: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are an elite Sports Scientist. Analyze these vitals and generate a 4-task training protocol for today.
      Vitals: Sleep ${vitals.sleepScore}, HRV ${vitals.hrv}, RHR ${vitals.rhr}.
      Stats: Readiness ${stats.readiness}%, Strength Index ${stats.strengthIndex}.
      
      Return a surgical, high-performance daily schedule.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              time: { type: Type.STRING },
              type: { type: Type.STRING, description: "Strength, Conditioning, Mobility, or Recovery" },
              metabolicLoad: { type: Type.STRING, description: "Low, Medium, or High" },
              prepContext: { type: Type.STRING, description: "Technical constraint or coaching cue" }
            },
            required: ["id", "title", "time", "type", "metabolicLoad", "prepContext"]
          }
        }
      },
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error generating protocol:", error);
    return null;
  }
};
