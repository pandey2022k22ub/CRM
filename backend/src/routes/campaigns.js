const express = require('express');
const Campaign = require('../models/Campaign');
const Segment = require('../models/Segment'); // ✅ needed for audienceSize
const router = express.Router();

// GET campaigns for user
router.get('/:userId', async (req, res) => {
  const campaigns = await Campaign.find({ userId: req.params.userId });
  res.json(campaigns);
});

// POST new campaign
router.post('/', async (req, res) => {
  const { name, segmentId, userId } = req.body;

  try {
    // Get segment audience size from DB
    const segment = await Segment.findById(segmentId);
    if (!segment) return res.status(404).json({ error: 'Segment not found' });

    const audienceSize = segment.rules.length * 100; // Optional logic; can replace with actual audienceSize if stored
    const campaign = new Campaign({
      name,
      segmentId,
      userId,
      audienceSize,
      sent: audienceSize,
      failed: Math.floor(audienceSize * 0.1),
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    console.error('Error creating campaign:', err);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// GET campaign stats for user
router.get('/stats/:userId', async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.params.userId });

    const totalCampaigns = campaigns.length;
    const totalAudience = campaigns.reduce((acc, c) => acc + c.audienceSize, 0);
    const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0);
    const totalFailed = campaigns.reduce((acc, c) => acc + c.failed, 0);

    const successRate = totalSent ? ((totalSent - totalFailed) / totalSent) * 100 : 0;
    const failRate = totalSent ? (totalFailed / totalSent) * 100 : 0;

    res.json({
      totalCampaigns,
      totalAudience,
      successRate: successRate.toFixed(2),
      failRate: failRate.toFixed(2),
      campaigns
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign stats' });
  }
});


module.exports = router;
