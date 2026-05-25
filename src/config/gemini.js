


// Install package
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// API Key
const API_KEY = "YOUR_API_KEY_HERE";

// Gemini setup
const genAI = new GoogleGenerativeAI(API_KEY);

// Model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

// Function
async function runChat(prompt) {

  // Generation settings
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Safety settings
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },

  ];

  // Start chat
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  // Send message
  const result = await chat.sendMessage(prompt);

  // Response
  const response = result.response;

  console.log(response.text());
  return response.text();
}

// Call function
export default runChat;