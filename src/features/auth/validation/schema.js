// Schemas declarativos usados pelos formulários de login e cadastro.
import {
  composeValidators,
  createSchemaResolver,
  email,
  minLength,
  required,
} from '../../../lib/forms/schema';

const AUTH_VALIDATION_MESSAGES = {
  emailRequired: 'E-mail é obrigatório',
  emailInvalid: 'Informe um e-mail válido',
  passwordRequired: 'Senha é obrigatória',
  passwordMinLength: 'A senha deve ter ao menos 6 caracteres',
  nameRequired: 'Nome completo é obrigatório',
  nameMinLength: 'Informe seu nome completo',
};

const emailValidator = composeValidators(
  required(AUTH_VALIDATION_MESSAGES.emailRequired),
  email(AUTH_VALIDATION_MESSAGES.emailInvalid),
);

const passwordValidator = composeValidators(
  required(AUTH_VALIDATION_MESSAGES.passwordRequired),
  minLength(6, AUTH_VALIDATION_MESSAGES.passwordMinLength),
);

// Resolver do login: valida apenas email e senha.
const loginResolver = createSchemaResolver({
  email: emailValidator,
  senha: passwordValidator,
});

// Resolver do cadastro: acrescenta a validação do nome.
const registerResolver = createSchemaResolver({
  name: composeValidators(
    required(AUTH_VALIDATION_MESSAGES.nameRequired),
    minLength(3, AUTH_VALIDATION_MESSAGES.nameMinLength),
  ),
  email: emailValidator,
  senha: passwordValidator,
});

export {
  AUTH_VALIDATION_MESSAGES,
  loginResolver,
  registerResolver,
};
