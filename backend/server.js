const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check route
app.get('/', (req, res) => {
  res.send('Annai Hospital API Backend is running securely on Gemini! 🏥');
});

// Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Track system instruction to prepend
    let systemInstruction = "";
    const geminiHistory = [];
    
    for (const msg of messages) {
       if (msg.role === 'system') {
           systemInstruction += msg.content + "\n";
       } else if (msg.role === 'user') {
           geminiHistory.push({ role: 'user', parts: [{text: msg.content}] });
       } else if (msg.role === 'assistant') {
           geminiHistory.push({ role: 'model', parts: [{text: msg.content}] });
       }
    }

    if (systemInstruction && geminiHistory.length > 0) {
        geminiHistory[0].parts[0].text = `[System Instructions: ${systemInstruction}]\n\nUser: ${geminiHistory[0].parts[0].text}`;
    }

    const lastMessageObj = geminiHistory.pop();
    const lastMessageText = lastMessageObj ? lastMessageObj.parts[0].text : "Hello";

    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(lastMessageText);
    const responseText = result.response.text();

    res.json({ content: responseText });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to fetch response from Gemini AI' });
  }
});

// Symptom Checker Endpoint
app.post('/api/symptom-check', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms string is required' });
    }

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
           responseMimeType: "application/json",
        }
    });

    const prompt = `You are an AI medical triage assistant. Analyze the user's symptoms and provide a JSON response summarizing it. Output EXACTLY this JSON structure and nothing else: {"condition": "Brief name of suspected condition", "dept": "Recommended department (e.g. Pediatrics, Cardiology, General Medicine, Orthopedics, Neurology, etc.)", "doc": "A suggested doctor name (e.g. Dr. P. Saravana Raja, Dr. G. Jamuna Saravana Raja, or generic placeholder)"}.\n\nUser Symptoms: ${symptoms}`;

    const result = await model.generateContent(prompt);
    let textResult = result.response.text();

    if (textResult.startsWith('```json')) {
        textResult = textResult.replace(/^```json\n/, '').replace(/\n```$/, '');
    }

    const aiResponse = JSON.parse(textResult);
    res.json(aiResponse);
  } catch (error) {
    console.error('Symptom Check API Error:', error);
    res.status(500).json({ error: 'Failed to analyze symptoms with Gemini' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
