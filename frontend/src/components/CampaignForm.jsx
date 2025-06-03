import React, { useState, useEffect } from 'react';
import { createCampaign, getAllSegments } from '../services/api';
import useAuth from '../hooks/useAuth';

const CampaignForm = ({ onCampaignCreated }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState('');

  useEffect(() => {
    const fetchSegments = async () => {
      const data = await getAllSegments(user.sub);
      setSegments(data);
    };
    fetchSegments();
  }, [user.sub]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaign = await createCampaign({
      name,
      segmentId: selectedSegment,
      userId: user.sub,
    });
    onCampaignCreated(campaign);
    setName('');
    setSelectedSegment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Campaign</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Campaign Name"
        required
      />

      <select
        value={selectedSegment}
        onChange={(e) => setSelectedSegment(e.target.value)}
        required
      >
        <option value="">Select Segment</option>
        {segments.map((seg) => (
          <option key={seg._id} value={seg._id}>
            {seg.name}
          </option>
        ))}
      </select>

      <button type="submit">Create</button>
    </form>
  );
};

export default CampaignForm;
