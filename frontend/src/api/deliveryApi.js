import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://crm-91or.onrender.com';

export const updateDeliveryStatus = async (receiptData) => {
  const response = await axios.post(`${API_BASE}/delivery/receipt`, receiptData);
  return response.data;
};
