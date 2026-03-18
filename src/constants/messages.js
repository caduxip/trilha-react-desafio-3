// Textos reutilizados pela interface.
// Centralizar mensagens facilita manutenção, testes e futura internacionalização.
const MESSAGES = {
  app: {
    unexpectedError: 'Algo inesperado aconteceu nesta tela.',
    unexpectedErrorHelp: 'Tente recarregar a página ou volte para o início para continuar.',
  },
  auth: {
    invalidCredentials: 'Usuário ou senha inválidos.',
    loginUnavailable: 'Não foi possível acessar a API. Execute npm run api e tente novamente.',
    emailInUse: 'Este e-mail já está em uso.',
    registerUnavailable: 'Não foi possível criar sua conta. Execute npm run api e tente novamente.',
  },
  feed: {
    loading: 'Carregando publicações...',
    loadError: 'Não foi possível carregar o feed agora. Tente novamente.',
    empty: 'Nenhuma publicação disponível no momento.',
  },
  ui: {
    backHome: 'Voltar ao início',
    reloadPage: 'Recarregar página',
    retry: 'Tentar novamente',
  },
};

export { MESSAGES };
