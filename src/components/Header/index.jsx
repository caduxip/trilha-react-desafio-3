import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-dio.png';

import { useAuth } from '../../features/auth';
import { ROUTES } from '../../routes/paths';
import { Button } from '../Button';

import {
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

const Header = ({autenticado}) => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut, user } = useAuth();
  const isUserAuthenticated = autenticado ?? isAuthenticated;

  const handleSignOut = () => {
    signOut();
    navigate(ROUTES.home, { replace: true });
  };

  return (
    <Wrapper>
      <Container>
          <Row>
            <LogoLink to={ROUTES.home}>
              <img src={logo} alt="Logo da dio"/>
            </LogoLink>
            {isUserAuthenticated ? (
              <>
               <BuscarInputContainer>
                <Input placeholder='Buscar...' aria-label='Buscar'/>
               </BuscarInputContainer>
                <MenuText>Live Code</MenuText>
                <MenuText>Global</MenuText>
              </>
            ) : null}
          </Row>
          <Row>
              {isUserAuthenticated ? (
                <UserMenu>
                  <span>{user?.name ?? 'Usuário'}</span>
                  <LogoutButton type="button" onClick={handleSignOut}>
                    Sair
                  </LogoutButton>
                  <UserPicture
                    src="https://avatars.githubusercontent.com/u/45184516?v=4"
                    alt="Usuário autenticado"
                  />
                </UserMenu>
              ) : (
              <>
                <MenuLink to={ROUTES.home}>Home</MenuLink>
                <Button as={Link} to={ROUTES.login} title="Entrar" />
                <Button as={Link} to={ROUTES.register} title="Cadastrar" />
              </>)}
          </Row>
      </Container>
    </Wrapper>
  )
}

export { Header }
