import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MESSAGES } from '../../../constants/messages';
import { ROUTES } from '../../../routes/paths';
import { useAuth } from '../context/auth';
import { authService } from '../services/auth';

const useLogin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');

  const submitLogin = async (credentials) => {
    // Cada submit começa com a limpeza do estado visual de erro.
    setApiError('');

    try {
      const user = await authService.login(credentials);

      if (!user) {
        setApiError(MESSAGES.auth.invalidCredentials);
        return false;
      }

      // Com sucesso, persistimos a sessão e redirecionamos para a rota protegida.
      signIn(user);
      navigate(ROUTES.feed, { replace: true });
      return true;
    } catch (error) {
      setApiError(MESSAGES.auth.loginUnavailable);
      return false;
    }
  };

  return {
    apiError,
    clearApiError: () => setApiError(''),
    submitLogin,
  };
};

export { useLogin };
