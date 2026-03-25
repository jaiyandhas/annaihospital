const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    res.json(response.choices[0].message);
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to fetch response from AI' });
  }
});

// Symptom Checker Endpoint
app.post('/api/symptom-check', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: 'Symptoms string is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an AI medical triage assistant. Analyze symptoms and provide a JSON response summarizing it. Output EXACTLY this JSON structure and nothing else: {"condition": "Brief name of suspected condition", "dept": "Recommended department (e.g. Pediatrics, Cardiology, General Medicine, Orthopedics, Neurology, etc.)", "doc": "A suggested doctor name (e.g. Dr. P. Saravana Raja, Dr. G. Jamuna Saravana Raja, or generic placeholder)"}. Always output valid JSON.'
        },
        { role: 'user', content: symptoms }
      ],
    });

    const aiResponse = JSON.parse(response.choices[0].message.content);
    res.json(aiResponse);
  } catch (error) {
    console.error('Symptom Check API Error:', error);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
