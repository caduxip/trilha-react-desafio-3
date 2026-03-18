import * as Sentry from '@sentry/react';

import { ENV_CONFIG } from '../../config/env';

let isMonitoringInitialized = false;

// Normaliza o contexto enviado ao provedor externo para manter
// um contrato simples: o resto do app só precisa passar um objeto comum.
const normalizeContext = (context = {}) => ({
  extra: context,
});

const initMonitoring = () => {
  // A integração externa é opcional para que o projeto continue simples
  // em ambiente local e só envie eventos quando o time configurar isso.
  if (!ENV_CONFIG.enableSentry || !ENV_CONFIG.sentryDsn || isMonitoringInitialized) {
    return;
  }

  Sentry.init({
    dsn: ENV_CONFIG.sentryDsn,
    enabled: true,
    environment: ENV_CONFIG.sentryEnvironment,
  });

  isMonitoringInitialized = true;
};

const monitoring = {
  captureError(error, context = {}) {
    // O app continua funcionando sem Sentry. Se a integração não estiver ligada,
    // o monitor externo apenas deixa de enviar eventos.
    if (!ENV_CONFIG.enableSentry || !ENV_CONFIG.sentryDsn) {
      return;
    }

    Sentry.captureException(error, normalizeContext(context));
  },

  captureMessage(message, context = {}) {
    if (!ENV_CONFIG.enableSentry || !ENV_CONFIG.sentryDsn) {
      return;
    }

    Sentry.captureMessage(message, normalizeContext(context));
  },

  initMonitoring,
};

export { monitoring };
