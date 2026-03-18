import { useState } from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AuthLayout } from '../../components/AuthLayout';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { authService, EMAIL_IN_USE } from '../../services/auth';

import {
  AccentText,
  Form,
  FormSubtitle,
  FormTitle,
  InlineLink,
  InlineText,
  LegalText,
  StatusText,
} from '../auth/styles';

const emailRules = {
  required: 'E-mail é obrigatório',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Informe um e-mail válido',
  },
};

const passwordRules = {
  required: 'Senha é obrigatória',
  minLength: {
    value: 6,
    message: 'A senha deve ter ao menos 6 caracteres',
  },
};

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
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (formData) => {
    setApiError('');

    try {
      const user = await authService.register(formData);

      signIn(user);
      navigate('/feed', { replace: true });
    } catch (error) {
      if (error.code === EMAIL_IN_USE) {
        setApiError('Este e-mail já está em uso.');
        return;
      }

      setApiError('Não foi possível criar sua conta. Verifique a API e tente novamente.');
    }
  };

  return (
    <AuthLayout>
      <FormTitle>Comece agora grátis</FormTitle>
      <FormSubtitle>Crie sua conta e make the change._</FormSubtitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Nome completo"
          leftIcon={<MdPerson />}
          name="name"
          control={control}
          rules={{
            required: 'Nome completo é obrigatório',
            minLength: {
              value: 3,
              message: 'Informe seu nome completo',
            },
          }}
          errorMessage={errors.name?.message}
        />

        <Input
          placeholder="E-mail"
          leftIcon={<MdEmail />}
          name="email"
          control={control}
          rules={emailRules}
          errorMessage={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Password"
          leftIcon={<MdLock />}
          name="senha"
          control={control}
          rules={passwordRules}
          errorMessage={errors.senha?.message}
        />

        <Button
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
        Já tenho conta. <InlineLink to="/login">Fazer login</InlineLink>
      </InlineText>
    </AuthLayout>
  );
};

export { Register };
