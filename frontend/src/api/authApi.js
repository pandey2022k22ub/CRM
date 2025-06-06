import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://crm-91or.onrender.com';

export const loginWithGoogle = () => {
  window.location.href = `${API_BASE}/auth/google`;
};

export const logout = async () => {
  return await axios.get(`${API_BASE}/auth/logout`, { withCredentials: true });
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE}/auth/user`, { withCredentials: true });
  return response.data;
};
