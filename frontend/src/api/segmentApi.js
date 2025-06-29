import axios from 'axios';

// const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://crm-91or.onrender.com/api';
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) || 'https://crm-91or.onrender.com/api';

export const createSegment = async (segmentData) => {
  const response = await axios.post(`${API_BASE}/segments`, segmentData);
  return response.data;
};

export const previewSegment = async (segmentData) => {
  const response = await axios.post(`${API_BASE}/segments/preview`, segmentData);
  return response.data.audienceSize;
};

export const getAllSegments = async (userId) => {
  const response = await axios.get(`${API_BASE}/segments/${userId}`);
  return response.data;
};
export const updateSegment = async (id, segmentData) => {
  const response = await axios.put(`${API_BASE}/segments/${id}`, segmentData);
  return response.data;
};

export const deleteSegment = async (id) => {
  const response = await axios.delete(`${API_BASE}/segments/${id}`);
  return response.data;
};

