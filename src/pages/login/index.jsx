import { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";

import { AuthLayout } from '../../components/AuthLayout';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { authService } from '../../services/auth';
import {
  Form,
  FormSubtitle,
  FormTitle,
  HelperLink,
  HelperRow,
  HelperText,
  StatusText,
} from '../auth/styles';

const Login = () => {
    const navigate = useNavigate()
    const { signIn } = useAuth();
    const [apiError, setApiError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting  },
    } = useForm({
        defaultValues: {
            email: '',
            senha: '',
        },
        reValidateMode: 'onChange',
        mode: 'onBlur',
    });

    const onSubmit = async (formData) => {
        setApiError('');

        try{
            const user = await authService.login(formData);

            if(user){
                signIn(user);
                navigate('/feed', { replace: true }) 
                return
            }

            setApiError('Usuário ou senha inválidos.')
        }catch(e){
            setApiError('Não foi possível acessar a API. Verifique o json-server e tente novamente.')
        }
    };

    return (
        <AuthLayout>
            <FormTitle>Faça seu login</FormTitle>
            <FormSubtitle>Acesse sua conta e make the change._</FormSubtitle>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="E-mail"
                    leftIcon={<MdEmail />}
                    name="email"
                    control={control}
                    rules={{
                        required: 'E-mail é obrigatório',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Informe um e-mail válido',
                        },
                    }}
                    errorMessage={errors.email?.message}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    leftIcon={<MdLock />}
                    name="senha"
                    control={control}
                    rules={{
                        required: 'Senha é obrigatória',
                        minLength: {
                            value: 6,
                            message: 'A senha deve ter ao menos 6 caracteres',
                        },
                    }}
                    errorMessage={errors.senha?.message}
                />
                <Button
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
                <HelperLink to="/cadastro">Criar conta</HelperLink>
            </HelperRow>
        </AuthLayout>
    )
}

export { Login }
