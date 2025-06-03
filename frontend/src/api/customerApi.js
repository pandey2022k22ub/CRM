import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://crm-91or.onrender.com';

export const ingestCustomers = async (customers) => {
  const response = await axios.post(`${API_BASE}/customers`, customers);
  return response.data;
};

export const ingestOrders = async (orders) => {
  const response = await axios.post(`${API_BASE}/orders`, orders);
  return response.data;
};
