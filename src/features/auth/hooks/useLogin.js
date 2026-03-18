import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MESSAGES } from '../../../constants/messages';
import { ROUTES } from '../../../routes/paths';
import { useAuth } from '../context/auth';
import { authService } from '../services/auth';

const useLogin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');
  // Estes refs ajudam a impedir que uma resposta antiga ou uma tela desmontada
  // atualize estado, sessão ou navegação fora do momento correto.
  const isMountedRef = useRef(true);
  const latestRequestRef = useRef(0);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const submitLogin = async (credentials) => {
    const requestId = latestRequestRef.current + 1;

    latestRequestRef.current = requestId;

    // Cada submit começa com a limpeza do estado visual de erro.
    setApiError('');

    try {
      const user = await authService.login(credentials);

      // Só a tentativa mais recente pode decidir erro, sessão e navegação.
      if (!isMountedRef.current || latestRequestRef.current !== requestId) {
        return false;
      }

      if (!user) {
        setApiError(MESSAGES.auth.invalidCredentials);
        return false;
      }

      // Com sucesso, persistimos a sessão e redirecionamos para a rota protegida.
      signIn(user);
      navigate(ROUTES.feed, { replace: true });
      return true;
    } catch (error) {
      if (isMountedRef.current && latestRequestRef.current === requestId) {
        setApiError(MESSAGES.auth.loginUnavailable);
      }

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
