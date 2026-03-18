const DEFAULT_AVATAR = 'https://avatars.githubusercontent.com/u/45184516?v=4';

const toAuthUser = (apiUser = {}) => ({
  id: apiUser.id,
  name: apiUser.name ?? 'Usuário',
  email: apiUser.email ?? '',
  avatar: apiUser.avatar ?? DEFAULT_AVATAR,
  percentual: apiUser.percentual ?? 0,
});

const toRegisterPayload = ({ email, name, senha }) => ({
  email,
  name,
  avatar: DEFAULT_AVATAR,
  percentual: 0,
  senha,
});

export {
  DEFAULT_AVATAR,
  toAuthUser,
  toRegisterPayload,
};
