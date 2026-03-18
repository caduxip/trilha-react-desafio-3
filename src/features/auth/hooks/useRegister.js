import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MESSAGES } from '../../../constants/messages';
import { ROUTES } from '../../../routes/paths';
import { useAuth } from '../context/auth';
import { authService, EMAIL_IN_USE } from '../services/auth';

const useRegister = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');
  // Estes refs protegem o fluxo contra respostas fora de ordem
  // quando o usuário dispara mais de um submit.
  const isMountedRef = useRef(true);
  const latestRequestRef = useRef(0);

  useEffect(() => {
    // Em desenvolvimento, o StrictMode pode montar e desmontar o componente
    // mais de uma vez para encontrar efeitos inseguros. Reativamos o ref aqui
    // para que o hook continue aceitando updates válidos após esse remount.
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const submitRegister = async (formData) => {
    const requestId = latestRequestRef.current + 1;

    latestRequestRef.current = requestId;

    // O hook concentra a regra de cadastro para a página ficar focada em renderização.
    setApiError('');

    try {
      const user = await authService.register(formData);

      // Se outra tentativa foi disparada depois desta, ignoramos o resultado antigo.
      if (!isMountedRef.current || latestRequestRef.current !== requestId) {
        return false;
      }

      signIn(user);
      navigate(ROUTES.feed, { replace: true });
      return true;
    } catch (error) {
      if (!isMountedRef.current || latestRequestRef.current !== requestId) {
        return false;
      }

      if (error.code === EMAIL_IN_USE) {
        setApiError(MESSAGES.auth.emailInUse);
        return false;
      }

      setApiError(MESSAGES.auth.registerUnavailable);
      return false;
    }
  };

  return {
    apiError,
    clearApiError: () => setApiError(''),
    submitRegister,
  };
};

export { useRegister };
