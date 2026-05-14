import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  timeout: 8000,
});

export async function saveMatch(payload) {
  const { data } = await api.post('/match', payload);
  return data;
}

export async function getMatches() {
  const { data } = await api.get('/matches');
  return data;
}

export default api;
