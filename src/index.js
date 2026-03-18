// Ponto de entrada da aplicação React.
// É aqui que toda a árvore do app é montada no elemento `root` do HTML.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// `StrictMode` ajuda a identificar efeitos colaterais e padrões inseguros em desenvolvimento.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
