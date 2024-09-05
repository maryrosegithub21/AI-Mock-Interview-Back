// /*
//  * Install the Generative AI SDK
//  *
//  * $ npm install @google/generative-ai
//  */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');



const app = express();
const port = 3002; // Ensure this matches the port you intend to use

const apiKey = process.env.API_KEY; // this is the key from the aistudio
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.use(bodyParser.json());

app.post('/api/interview', async (req, res) => {
  const { userResponse, conversation, role } = req.body;

  console.log('Received request:', { userResponse, conversation, role });
  
  // Validate and structure the conversation object
  if (!Array.isArray(conversation) || !conversation.every(entry => {
    return typeof entry === 'object' && entry !== null &&
           typeof entry.role === 'string' &&
           Array.isArray(entry.parts) &&
           entry.parts.every(part => typeof part === 'object' && part !== null && typeof part.text === 'string');
  })) {
    return res.status(400).json({ error: "Invalid conversation format. Each entry should be an object with 'role' and 'parts' properties, where 'parts' is an array of objects containing 'text'." });
  }

  // Update systemInstruction to the role
  const systemInstruction = `The AI name is Mary acts as job interviewer for the job of ${role}. It should ask a series of questions to the user, and can adjust its response based on the answers.\n\nThe flow will start with the Interviewer saying “Tell me about yourself”. \n\n It should ask at least 6 questions based on response of the user. Other than the first question, the questions should not to be “hardcoded” in the prompt or in the code. You can however mention topic areas to ask questions for (if needed).\n\nThe questions should be to interview for the role typed in by the user.\n\nAt the end of the whole interview, the AI Interviewer should say thank you for your time and should comment on how well the user answered the questions, and suggest how the user can improve its response.`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction,
  });

  const chatSession = model.startChat({
    generationConfig,
    history: conversation, // Pass conversation directly
  });

  try {
    const result = await chatSession.sendMessage(userResponse);
    const aiResponse = result.response.text();
    res.json({ aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


