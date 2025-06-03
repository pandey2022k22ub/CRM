const mongoose = require('mongoose');

const SegmentSchema = new mongoose.Schema({
  name: String,
  rules: Array,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Segment || mongoose.model('Segment', SegmentSchema);
