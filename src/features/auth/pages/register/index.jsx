// Página de cadastro.
// Valida os dados e delega o fluxo assíncrono ao hook da feature.
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../../../components/AuthLayout';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { ROUTES } from '../../../../routes/paths';
import { useRegister } from '../../hooks/useRegister';
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
  const { apiError, submitRegister } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // Os campos começam vazios e o resolver concentra toda a validação declarativa.
    defaultValues: {
      email: '',
      name: '',
      senha: '',
    },
    resolver: registerResolver,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <AuthLayout>
      <FormTitle>Comece agora grátis</FormTitle>
      <FormSubtitle>Crie sua conta e make the change._</FormSubtitle>

      <Form
        onSubmit={handleSubmit((formData) => {
          // A página só coleta os dados; o hook da feature cuida do cadastro e navegação.
          return submitRegister(formData);
        })}
      >
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
        <AccentText>Políticas de Privacidade</AccentText> e{' '}
        <AccentText>Termos de Uso da DIO</AccentText>.
      </LegalText>

      <InlineText>
        Já tenho conta. <InlineLink to={ROUTES.login}>Fazer login</InlineLink>
      </InlineText>
    </AuthLayout>
  );
};

export { Register };
