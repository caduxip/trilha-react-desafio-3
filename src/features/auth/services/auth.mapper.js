// Mapeadores da feature de autenticação.
// Eles transformam o formato cru da API em um formato mais estável para a UI.
const DEFAULT_AVATAR = 'https://avatars.githubusercontent.com/u/45184516?v=4';

const toAuthUser = (apiUser = {}) => ({
  id: apiUser.id,
  name: apiUser.name ?? 'Usuário',
  email: apiUser.email ?? '',
  avatar: apiUser.avatar ?? DEFAULT_AVATAR,
  percentual: apiUser.percentual ?? 0,
});

// Payload padrão que enviamos ao json-server no cadastro.
const toRegisterPayload = ({ email, name, senha }) => ({
  email,
  name,
  avatar: DEFAULT_AVATAR,
  percentual: 0,
  senha,
});

export { DEFAULT_AVATAR, toAuthUser, toRegisterPayload };
