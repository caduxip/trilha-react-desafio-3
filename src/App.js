// `App` organiza os providers globais que sustentam todo o fluxo da aplicação.
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AppErrorBoundary } from './components/AppErrorBoundary';
import { AuthProvider } from './features/auth';
import { AppRoutes } from './routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

function App() {
  return (
    // O provider de autenticação fica no topo para que rotas, header e hooks
    // de domínio enxerguem a mesma fonte de verdade da sessão local.
    <AuthProvider>
      {/* Injeta os tokens visuais usados pelos styled-components. */}
      <ThemeProvider theme={theme}>
        {/* Controla a navegação entre telas sem recarregar a página. */}
        <Router>
          <GlobalStyle />
          {/* Evita tela branca total quando algum componente lança erro em renderização. */}
          <AppErrorBoundary>
            <AppRoutes />
          </AppErrorBoundary>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
