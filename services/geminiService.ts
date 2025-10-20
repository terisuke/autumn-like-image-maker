import { GoogleGenAI, Modality } from '@google/genai';
import { ERROR_MESSAGES } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const autumnifyImage = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: 'Transform this image into a beautiful autumn scene. Focus on changing the foliage of trees and any visible leaves on the ground to vibrant autumn colors like deep reds, bright yellows, and rich oranges. It is very important to keep the color of the sky, buildings, people, and other non-plant objects as natural as possible. Do not apply a simple color filter over the entire image. The goal is a realistic and selective transformation of the season to peak autumn. Do not add any text or objects to the image.',
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

    throw new Error(ERROR_MESSAGES.NO_PROCESSED_IMAGE);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(ERROR_MESSAGES.API_PROCESSING_FAILED);
  }
};
