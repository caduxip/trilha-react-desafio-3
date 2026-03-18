// Página de login.
// Responsável por validar os dados e delegar o fluxo assíncrono ao hook de domínio.
import { MdEmail, MdLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../../../components/AuthLayout';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { ROUTES } from '../../../../routes/paths';
import { useLogin } from '../../hooks/useLogin';
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
  const { apiError, submitLogin } = useLogin();

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

  return (
    <AuthLayout>
      <FormTitle>Faça seu login</FormTitle>
      <FormSubtitle>Acesse sua conta e make the change._</FormSubtitle>

      <Form
        onSubmit={handleSubmit((formData) => {
          // A página só dispara o caso de uso; o hook decide sessão, erro e redirecionamento.
          return submitLogin(formData);
        })}
      >
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
