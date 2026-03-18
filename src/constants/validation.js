const authValidationRules = {
  email: {
    required: 'E-mail é obrigatório',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Informe um e-mail válido',
    },
  },
  password: {
    required: 'Senha é obrigatória',
    minLength: {
      value: 6,
      message: 'A senha deve ter ao menos 6 caracteres',
    },
  },
  name: {
    required: 'Nome completo é obrigatório',
    minLength: {
      value: 3,
      message: 'Informe seu nome completo',
    },
  },
};

export { authValidationRules };
