import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://crm-91or.onrender.com';

export const createCampaign = async (campaignData) => {
  const response = await axios.post(`${API_BASE}/campaigns`, campaignData);
  return response.data;
};

export const getCampaigns = async () => {
  const response = await axios.get(`${API_BASE}/campaigns`);
  return response.data;
};
