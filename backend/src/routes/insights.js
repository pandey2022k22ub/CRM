const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const Segment = require('../models/Segment');
const Campaign = require('../models/Campaign');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/generate', async (req, res) => {
  const { userId } = req.body;

  try {
    const segments = await Segment.find({ userId });
    const campaigns = await Campaign.find({ userId });

    if (!segments.length && !campaigns.length) {
      return res.status(200).json({ insights: 'No segments or campaigns found to generate insights.' });
    }

    const prompt = `
You are a CRM AI assistant. Based on the following user data, generate 3 smart insights to improve their marketing campaigns:

Segments: ${JSON.stringify(segments, null, 2)}
Campaigns: ${JSON.stringify(campaigns, null, 2)}

Respond with bullet points only.
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const aiText = response.data.choices[0].message.content;
    res.json({ insights: aiText });
  } catch (err) {
    console.error('AI insight error:', err);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});


module.exports = router;
