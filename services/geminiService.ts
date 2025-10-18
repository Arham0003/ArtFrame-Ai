
import { GoogleGenAI, Modality } from "@google/genai";
import type { Size } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. Please provide a valid API key for the app to function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

export async function generateImage(
  prompt: string,
  style: string,
  size: Size
): Promise<string> {
  if (!process.env.API_KEY && process.env.NODE_ENV !== 'development') {
    throw new Error("API_KEY is not configured.");
  }
  
  try {
    const fullPrompt = `${prompt}, in the style of ${style}. High resolution wallpaper, 8k, detailed, professional quality. Generate the image with an aspect ratio of ${size.width}:${size.height}.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error("The configured API key is invalid. Please check your configuration.");
        }
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
}
