import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAiInsights(childData: {
  name: string;
  indicators: Array<{ name: string; value: number }>;
  language: string;
}) {
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("AI Insight Error:", error);
    return null;
  }
}
