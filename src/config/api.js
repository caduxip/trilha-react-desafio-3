// Configuração enxuta do cliente HTTP.
import { ENV_CONFIG } from './env';

const API_CONFIG = {
  baseURL: ENV_CONFIG.apiUrl,
  timeout: 5000,
};

export { API_CONFIG };
