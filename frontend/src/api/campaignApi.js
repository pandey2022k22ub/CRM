import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'https://crm-91or.onrender.com';

export const createCampaign = async (campaignData) => {
  const response = await axios.post(`${API_BASE}/campaigns`, campaignData);
  return response.data;
};

export const getCampaigns = async () => {
  const response = await axios.get(`${API_BASE}/campaigns`);
  return response.data;
};


export const getAllCampaigns = async (userId) => {
  const res = await axios.get(`/api/campaigns/${userId}`);
  return res.data;
};
