const express = require('express');
const router = express.Router();
const {GoogleGenAI} = require('@google/genai');
const Segment = require('../models/Segment');
const Campaign = require('../models/Campaign');

// ✅ Initialize Gemini SDK with API Key
const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

router.post('/generate', async (req, res) => {
  const { userId } = req.body;
  console.log('AI Insights requested for user:', userId);

  try {
    const segments = await Segment.find({ "rules.userId": userId });
    const campaigns = await Campaign.find({ userId });

    console.log('Segments found:', segments.length);
    console.log('Campaigns found:', campaigns.length);

    if (!segments.length && !campaigns.length) {
      return res.status(200).json({ insights: 'No segments or campaigns found to generate insights.' });
    }

    const prompt = `
You are a CRM AI assistant. Based on the following user data, generate 3 smart insights to improve their marketing campaigns:

Segments: ${JSON.stringify(segments, null, 2)}
Campaigns: ${JSON.stringify(campaigns, null, 2)}

Respond with bullet points only.
    `;

    // ✅ Call Gemini model correctly
    const response = await genAI.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: prompt,
    
  });
  console.log(response.text);
    const text = response.text;


    console.log('AI Insights generated:\n', text);
    res.json({ insights: text });

  } catch (err) {
    console.error('Gemini AI insight error:', err.message || err);
    res.status(500).json({ error: 'Failed to generate insights from Gemini' });
  }
});

module.exports = router;
