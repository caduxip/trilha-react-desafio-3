// Página de cadastro.
// Valida os dados, tenta criar o usuário e, em caso de sucesso, inicia a sessão automaticamente.
import { useState } from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../../../components/AuthLayout';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { MESSAGES } from '../../../../constants/messages';
import { ROUTES } from '../../../../routes/paths';
import { useAuth } from '../../context/auth';
import { authService, EMAIL_IN_USE } from '../../services/auth';
import { registerResolver } from '../../validation/schema';

import {
  AccentText,
  Form,
  FormSubtitle,
  FormTitle,
  InlineLink,
  InlineText,
  LegalText,
  StatusText,
} from '../../styles';

const Register = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [apiError, setApiError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      senha: '',
    },
    resolver: registerResolver,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (formData) => {
    // Cada tentativa nova começa sem mensagem de erro antiga.
    setApiError('');

    try {
      const user = await authService.register(formData);

      signIn(user);
      // Após cadastrar, o usuário já entra diretamente na área autenticada.
      navigate(ROUTES.feed, { replace: true });
    } catch (error) {
      // Tratamos separadamente regra de negócio conhecida e erro genérico de integração.
      if (error.code === EMAIL_IN_USE) {
        setApiError(MESSAGES.auth.emailInUse);
        return;
      }

      setApiError(MESSAGES.auth.registerUnavailable);
    }
  };

  return (
    <AuthLayout>
      <FormTitle>Comece agora grátis</FormTitle>
      <FormSubtitle>Crie sua conta e make the change._</FormSubtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoComplete="name"
          label="Nome completo"
          placeholder="Nome completo"
          leftIcon={<MdPerson />}
          name="name"
          control={control}
          errorMessage={errors.name?.message}
        />

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
          autoComplete="new-password"
          label="Senha"
          type="password"
          placeholder="Password"
          leftIcon={<MdLock />}
          name="senha"
          control={control}
          errorMessage={errors.senha?.message}
        />

        <Button
          // O label muda para reforçar que existe uma operação assíncrona em andamento.
          title={isSubmitting ? 'Criando conta...' : 'Criar minha conta'}
          variant="secondary"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        />

        {apiError ? <StatusText $error>{apiError}</StatusText> : null}
      </Form>

      <LegalText>
        Ao clicar em &quot;criar minha conta grátis&quot;, declaro que aceito as{' '}
        <AccentText>Políticas de Privacidade</AccentText> e <AccentText>Termos de Uso da DIO</AccentText>.
      </LegalText>

      <InlineText>
        Já tenho conta. <InlineLink to={ROUTES.login}>Fazer login</InlineLink>
      </InlineText>
    </AuthLayout>
  );
};

export { Register };
