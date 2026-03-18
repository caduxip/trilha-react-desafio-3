// Cabeçalho principal da aplicação.
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-dio.png';

import { useAuth } from '../../features/auth';
import { ROUTES } from '../../routes/paths';
import { Button } from '../Button';

import {
  SkipLink,
  Container,
  Wrapper,
  BuscarInputContainer,
  Input,
  Row,
  MenuLink,
  MenuText,
  UserMenu,
  LogoLink,
  LogoutButton,
  UserPicture,
} from './styles';

const Header = ({ autenticado }) => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut, user } = useAuth();
  // Mantemos a prop `autenticado` por compatibilidade, mas o contexto é a fonte principal.
  const isUserAuthenticated = autenticado ?? isAuthenticated;

  const handleSignOut = () => {
    // Encerra a sessão e redireciona para a área pública.
    signOut();
    navigate(ROUTES.home, { replace: true });
  };

  const handleSearchSubmit = (event) => {
    // A busca ainda é apenas visual, então impedimos submit tradicional.
    event.preventDefault();
  };

  return (
    <Wrapper as="header">
      <SkipLink href="#page-content">Pular para o conteúdo principal</SkipLink>
      <Container>
        <Row>
          <LogoLink to={ROUTES.home}>
            <img src={logo} alt="DIO" />
          </LogoLink>
          {isUserAuthenticated ? (
            <>
              <BuscarInputContainer as="form" onSubmit={handleSearchSubmit} role="search">
                <Input placeholder="Buscar..." aria-label="Buscar" type="search" />
              </BuscarInputContainer>
              <MenuText>Live Code</MenuText>
              <MenuText>Global</MenuText>
            </>
          ) : null}
        </Row>
        <Row
          as={isUserAuthenticated ? 'div' : 'nav'}
          aria-label={isUserAuthenticated ? undefined : 'Navegação principal'}
        >
          {isUserAuthenticated ? (
            <UserMenu>
              {/* O cabeçalho autenticado vira um ponto rápido de contexto de sessão. */}
              <span>{user?.name ?? 'Usuário'}</span>
              <LogoutButton type="button" onClick={handleSignOut}>
                Sair
              </LogoutButton>
              <UserPicture
                src={user?.avatar ?? 'https://avatars.githubusercontent.com/u/45184516?v=4'}
                alt={`Avatar de ${user?.name ?? 'Usuário autenticado'}`}
              />
            </UserMenu>
          ) : (
            <>
              <MenuLink to={ROUTES.home}>Home</MenuLink>
              {/* A vitrine ajuda o time a reutilizar a UI antes de criar novos componentes. */}
              <MenuLink to={ROUTES.uiCatalog}>Componentes</MenuLink>
              <Button as={Link} to={ROUTES.login} title="Entrar" />
              <Button as={Link} to={ROUTES.register} title="Cadastrar" />
            </>
          )}
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Header };
