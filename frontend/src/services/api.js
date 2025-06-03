import axios from 'axios';

const API_BASE = 'https://crm-91or.onrender.com/api';

export const fetchCampaigns = async (userId) => {
  const res = await axios.get(`${API_BASE}/campaigns/${userId}`);
  return res.data;
};

export const createCampaign = async (campaignData) => {
  const res = await axios.post(`${API_BASE}/campaigns`, campaignData);
  return res.data;
};
export const getAllSegments = async (userId) => {
  const response = await axios.get(`${API_BASE}/segments/${userId}`);
  return response.data;
};

export const fetchSegments = async () => {
  const res = await axios.get(`${API_BASE}/segments`);
  return res.data;
};

export const createSegment = async (segmentData) => {
  const res = await axios.post(`${API_BASE}/segments`, segmentData);
  return res.data;
};

export const getCampaignStats = async (userId) => {
  const response = await axios.get(`${API_BASE}/campaigns/stats/${userId}`);
  return response.data;
};

