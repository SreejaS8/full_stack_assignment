import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api'),
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
  if (!Array.isArray(data)) {
    throw new Error('Match history API returned an unexpected response.');
  }
  return data;
}

export default api;
