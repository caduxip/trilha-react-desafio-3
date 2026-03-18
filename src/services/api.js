// Instância única do axios compartilhada por toda a aplicação.
// Centralizar o cliente HTTP facilita manter baseURL, timeout e futuros interceptors.
import axios from 'axios';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  // A URL vem da config centralizada para facilitar troca entre ambientes.
  baseURL: API_CONFIG.baseURL,
  // Timeout curto ajuda a evitar a sensação de tela travada.
  timeout: API_CONFIG.timeout,
});

export { api };
