// Ponto de entrada da aplicação React.
// É aqui que toda a árvore do app é montada no elemento `root` do HTML.
// Este arquivo foi mantido simples de propósito para facilitar uma futura
// troca do CRA por outro bundler sem espalhar lógica de bootstrap.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { logger } from './lib/observability/logger';
import { monitoring } from './lib/observability/monitor';
import reportWebVitals from './reportWebVitals';

// `StrictMode` ajuda a identificar efeitos colaterais e padrões inseguros em desenvolvimento.
const root = ReactDOM.createRoot(document.getElementById('root'));

// A inicialização externa fica no bootstrap para acontecer uma vez
// e antes das primeiras interações da aplicação.
monitoring.initMonitoring();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Métricas de performance são opcionais e controladas por variável de ambiente.
// Isso nos permite ligar a observabilidade sem alterar o código da aplicação.
reportWebVitals((metric) => {
  logger.reportWebVital(metric);
});
