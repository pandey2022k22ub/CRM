import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const generateMessageSuggestions = async (prompt) => {
  const response = await axios.post(`${API_BASE}/ai/message-suggestions`, { prompt });
  return response.data.suggestions;
};

export const naturalLanguageToRules = async (textPrompt) => {
  const response = await axios.post(`${API_BASE}/ai/rule-builder`, { textPrompt });
  return response.data.rules;
};
