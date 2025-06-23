import { API_BASE_URL } from '@env';

export const getApiConfig = () => ({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
