import { ERROR_MESSAGES } from '../constants';

export const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // The result includes the data URL prefix (e.g., "data:image/png;base64,"),
        // which we need to strip off for the API call.
        const base64Data = reader.result.split(',')[1];
        resolve({ base64Data, mimeType: file.type });
      } else {
        reject(new Error(ERROR_MESSAGES.FILE_READ_FAILED));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
