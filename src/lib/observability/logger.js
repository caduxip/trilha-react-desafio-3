import { ENV_CONFIG } from '../../config/env';
import { monitoring } from './monitor';

const LOG_LEVEL_PRIORITY = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: Number.POSITIVE_INFINITY,
};

const shouldLog = (level) => LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[ENV_CONFIG.logLevel];

const createPayload = (message, metadata = {}) => ({
  message,
  metadata,
  timestamp: new Date().toISOString(),
});

const writeLog = (method, message, metadata) => {
  if (!shouldLog(method)) {
    return;
  }

  const payload = createPayload(message, metadata);

  // Centralizamos o console aqui para que o restante da aplicação
  // não precise conhecer detalhes de ambiente ou formato de saída.
  console[method](message, payload);
};

const logger = {
  debug(message, metadata) {
    writeLog('debug', message, metadata);
  },

  info(message, metadata) {
    writeLog('info', message, metadata);
  },

  warn(message, metadata) {
    writeLog('warn', message, metadata);
  },

  error(message, metadata) {
    writeLog('error', message, metadata);
    // Logs de erro seguem indo para o console local e, quando configurado,
    // também são encaminhados para o provedor externo de observabilidade.
    if (metadata?.skipExternalMonitoring) {
      return;
    }

    monitoring.captureMessage(message, metadata);
  },

  reportRuntimeError(error, context = {}) {
    // A boundary e outros pontos críticos usam este helper para
    // deixar o formato do erro consistente e pronto para futura
    // integração com ferramentas externas como Sentry.
    monitoring.captureError(error, context);
    this.error('Frontend runtime error captured.', {
      ...context,
      errorMessage: error?.message,
      errorName: error?.name,
      skipExternalMonitoring: true,
      stack: error?.stack,
    });
  },

  reportWebVital(metric) {
    this.info('Web vitals metric captured.', {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
    });
  },
};

export { logger };
