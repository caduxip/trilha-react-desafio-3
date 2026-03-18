// Instância única do axios compartilhada por toda a aplicação.
// Centralizar o cliente HTTP facilita manter baseURL, timeout e futuros interceptors.
import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { logger } from '../lib/observability/logger';

const api = axios.create({
  // A URL vem da config centralizada para facilitar troca entre ambientes.
  baseURL: API_CONFIG.baseURL,
  // Timeout curto ajuda a evitar a sensação de tela travada.
  timeout: API_CONFIG.timeout,
});

let requestSequence = 0;

api.interceptors.request.use((config) => {
  // Cada request recebe um identificador simples para ligar logs de início e fim.
  const requestId = `req-${(requestSequence += 1)}`;
  const metadata = {
    requestId,
    startedAt: Date.now(),
  };

  // Guardamos metadados no próprio config para medir duração da chamada depois.
  config.metadata = metadata;

  logger.debug('HTTP request started.', {
    method: config.method?.toUpperCase(),
    requestId,
    url: config.url,
  });

  return config;
});

api.interceptors.response.use(
  (response) => {
    const durationInMs = Date.now() - (response.config.metadata?.startedAt ?? Date.now());

    logger.debug('HTTP request finished.', {
      durationInMs,
      method: response.config.method?.toUpperCase(),
      requestId: response.config.metadata?.requestId,
      status: response.status,
      url: response.config.url,
    });

    return response;
  },
  (error) => {
    const durationInMs = Date.now() - (error.config?.metadata?.startedAt ?? Date.now());

    logger.warn('HTTP request failed.', {
      durationInMs,
      method: error.config?.method?.toUpperCase(),
      requestId: error.config?.metadata?.requestId,
      status: error.response?.status,
      url: error.config?.url,
    });

    return Promise.reject(error);
  },
);

export { api };
