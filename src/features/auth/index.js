// Barrel da feature de autenticação.
export { AuthProvider, useAuth } from './context/auth';
export { useLogin } from './hooks/useLogin';
export { useRegister } from './hooks/useRegister';
export { authService, EMAIL_IN_USE } from './services/auth';
