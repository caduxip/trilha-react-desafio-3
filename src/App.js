import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import { AppRoutes } from './routes';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
