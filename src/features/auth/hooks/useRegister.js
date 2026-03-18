import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MESSAGES } from '../../../constants/messages';
import { ROUTES } from '../../../routes/paths';
import { useAuth } from '../context/auth';
import { authService, EMAIL_IN_USE } from '../services/auth';

const useRegister = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');

  const submitRegister = async (formData) => {
    // O hook concentra a regra de cadastro para a página ficar focada em renderização.
    setApiError('');

    try {
      const user = await authService.register(formData);

      signIn(user);
      navigate(ROUTES.feed, { replace: true });
      return true;
    } catch (error) {
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
