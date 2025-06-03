import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const updateDeliveryStatus = async (receiptData) => {
  const response = await axios.post(`${API_BASE}/delivery/receipt`, receiptData);
  return response.data;
};
