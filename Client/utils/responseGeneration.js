import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
];

const getAiChat = (chatHistory) => {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      safetySettings: safetySettings,
    },
    history: chatHistory,
  });
  return chat;
};

export default getAiChat;
