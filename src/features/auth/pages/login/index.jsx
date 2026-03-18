// Página de login.
// Responsável por validar os dados, acionar o serviço de auth e iniciar a sessão.
import { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../../../components/AuthLayout';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { MESSAGES } from '../../../../constants/messages';
import { ROUTES } from '../../../../routes/paths';
import { useAuth } from '../../context/auth';
import { authService } from '../../services/auth';
import { loginResolver } from '../../validation/schema';
import {
  Form,
  FormSubtitle,
  FormTitle,
  HelperLink,
  HelperRow,
  HelperText,
  StatusText,
} from '../../styles';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // O formulário começa vazio e o resolver decide se cada campo está válido.
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: loginResolver,
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  const onSubmit = async (formData) => {
    // Limpa erros antigos antes de tentar novo login.
    setApiError('');

    try {
      // A página conhece só o caso de uso "fazer login".
      // Os detalhes de HTTP ficam encapsulados no serviço.
      const user = await authService.login(formData);

      if (user) {
        // Sessão válida encontrada: salvamos no contexto e seguimos para a área privada.
        signIn(user);
        navigate(ROUTES.feed, { replace: true });
        return;
      }

      // Quando o serviço não encontra o usuário, tratamos como credenciais inválidas.
      setApiError(MESSAGES.auth.invalidCredentials);
    } catch (e) {
      // Erro de rede, indisponibilidade da API mock ou falha inesperada.
      setApiError(MESSAGES.auth.loginUnavailable);
    }
  };

  return (
    <AuthLayout>
      <FormTitle>Faça seu login</FormTitle>
      <FormSubtitle>Acesse sua conta e make the change._</FormSubtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoComplete="email"
          label="E-mail"
          placeholder="E-mail"
          leftIcon={<MdEmail />}
          name="email"
          control={control}
          errorMessage={errors.email?.message}
        />
        <Input
          autoComplete="current-password"
          label="Senha"
          type="password"
          placeholder="Password"
          leftIcon={<MdLock />}
          name="senha"
          control={control}
          errorMessage={errors.senha?.message}
        />
        <Button
          // Enquanto o submit acontece, o botão muda para reforçar o estado assíncrono.
          title={isSubmitting ? 'Entrando...' : 'Entrar'}
          variant="secondary"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        />

        {apiError ? <StatusText $error>{apiError}</StatusText> : null}
      </Form>

      <HelperRow>
        <HelperText>Esqueci minha senha</HelperText>
        <HelperLink to={ROUTES.register}>Criar conta</HelperLink>
      </HelperRow>
    </AuthLayout>
  );
};

export { Login };
