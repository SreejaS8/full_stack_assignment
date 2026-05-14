import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  console.info(`[api] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.info(`[api] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[api] Request failed', {
      message: error.message,
      url: `${error.config?.baseURL ?? ''}${error.config?.url ?? ''}`,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export async function saveMatch(payload) {
  const { data } = await api.post('/match', payload);
  return data;
}

export async function getMatches() {
  const { data } = await api.get('/matches');
  return data;
}

export default api;
