import { ENV_CONFIG } from './config/env';

const reportWebVitals = (onPerfEntry) => {
  // As métricas são opcionais para não poluir o console local por padrão.
  // Quando a flag estiver ligada, começamos a capturar desempenho de navegação.
  if (!ENV_CONFIG.enableWebVitals || typeof onPerfEntry !== 'function') {
    return;
  }

  import('web-vitals').then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
    getCLS(onPerfEntry);
    getFCP(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  });
};

export default reportWebVitals;
