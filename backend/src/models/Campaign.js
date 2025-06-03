const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: String,
  audienceSize: Number,
  sent: Number,
  failed: Number,
  userId: String,
  segmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);
