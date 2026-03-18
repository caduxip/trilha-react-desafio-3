import React from 'react';

import { Header } from '../Header';

import { Container, Column, HeroTitle, FormWrapper } from './styles';

const DEFAULT_HERO_TITLE =
  'A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.';

const AuthLayout = ({ children, heroTitle = DEFAULT_HERO_TITLE }) => {
  return (
    <>
      <Header />
      <Container>
        <Column>
          <HeroTitle>{heroTitle}</HeroTitle>
        </Column>
        <Column>
          <FormWrapper>{children}</FormWrapper>
        </Column>
      </Container>
    </>
  );
};

export { AuthLayout };
