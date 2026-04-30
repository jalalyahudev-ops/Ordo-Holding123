import { GoogleGenAI } from "@google/genai";

// Ключ берется из переменных окружения. В Vercel его нужно добавить как VITE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "AIzaSyD2opCVlv0jgKIsL_neu-p5spWpxuwuT18";

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function getAiInsights(childData: {
  name: string;
  indicators: Array<{ name: string; value: number }>;
  language: string;
}) {
  if (!apiKey) {
    console.error("Gemini API Key is missing! Set VITE_GEMINI_API_KEY in environment.");
    return null;
  }
  const prompt = `
    You are an expert child development psychologist and educational consultant for the "Orda" educational platform.
    
    Child Name: ${childData.name}
    Metrics: ${JSON.stringify(childData.indicators)}
    Target Language: ${childData.language}

    Tasks:
    1. PERSUADE PARENTS: Analyze the data and tell the parents why their child is a "hidden genius" or has immense potential. Use a motivating, professional, and warm tone.
    2. SMART RECOMMENDATIONS: Based on the scores, suggest specific types of extracurricular activities (e.g., "Robotics" if Logic is high, "Theater" if Social is low but improving).
    3. CHILD MOTIVATION: Write a short, inspiring message for the child themselves that the parent can read to them.
    4. UPSELL: Briefly mention how continued diagnostic monitoring in this app will ensure their child reaches a top-tier university or career path.

    Format the response as a JSON object with:
    {
      "parentMotivation": "string",
      "recommendedActivities": ["string", "string"],
      "messageForChild": "string",
      "futureOutlook": "string"
    }

    Respond ONLY with the JSON. Translation should be in ${childData.language}.
  `;

  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("AI Insight Error:", error);
    return null;
  }
}
