const express = require('express');
const Segment = require('../models/Segment'); 
const router = express.Router();

// GET segments by userId
router.get('/:userId', async (req, res) => {
  try {
    const segments = await Segment.find({ userId: req.params.userId });
    res.json(segments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new segment
router.post('/', async (req, res) => {
  console.log('Received segment data:', req.body); // Debugging line
  try {
    const { name, rules, userId } = req.body;

    const newSegment = new Segment({ name, rules, userId });
    await newSegment.save();

    res.status(201).json(newSegment);
  } catch (err) {
    console.error('Error saving segment:', err);
    res.status(500).json({ error: 'Failed to save segment' });
  }
});

// PUT update segment
router.put('/:id', async (req, res) => {
  try {
    const { name, rules } = req.body;
    const updated = await Segment.findByIdAndUpdate(
      req.params.id,
      { name, rules },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error updating segment:', err);
    res.status(500).json({ error: 'Failed to update segment' });
  }
});

// DELETE segment
router.delete('/:id', async (req, res) => {
  try {
    await Segment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Segment deleted' });
  } catch (err) {
    console.error('Error deleting segment:', err);
    res.status(500).json({ error: 'Failed to delete segment' });
  }
});

module.exports = router;
