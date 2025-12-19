
import { GoogleGenAI } from "@google/genai";
import { RollBatch } from "../types";

export const interpretRoll = async (batch: RollBatch): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const rollSummary = batch.rolls
    .map(r => `${r.type}: ${r.value}`)
    .join(", ");
  
  const prompt = `You are an expert Dungeon Master. Interpret this set of TRPG rolls for a player. 
  The total is ${batch.total}. The individual rolls are: ${rollSummary}.
  Provide a short, evocative, and thematic narrative description of what might happen in a fantasy setting based on these results (1-2 sentences). 
  Be dramatic if the total is high or low!`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        temperature: 0.8,
      }
    });
    
    return response.text?.trim() || "The spirits are silent on this roll.";
  } catch (error) {
    console.error("AI Interpretation Error:", error);
    return "The dice clatter, but the oracle's voice is muffled by the winds of fate.";
  }
};
