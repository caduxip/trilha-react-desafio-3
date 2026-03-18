// Layout compartilhado entre login e cadastro.
import React from 'react';

import { Header } from '../Header';

import { Container, Column, HeroTitle, FormWrapper } from './styles';

const DEFAULT_HERO_TITLE =
  'A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.';

const AuthLayout = ({ children, heroTitle = DEFAULT_HERO_TITLE }) => {
  return (
    <>
      <Header />
      {/* O id abaixo é o alvo do skip link do Header para levar o foco direto ao conteúdo principal. */}
      <Container as="main" id="page-content">
        <Column>
          <HeroTitle>{heroTitle}</HeroTitle>
        </Column>
        <Column>
          {/* O conteúdo do formulário é injetado por login/cadastro,
              então este layout cuida só da moldura compartilhada. */}
          <FormWrapper as="section" aria-label="Área de autenticação">
            {children}
          </FormWrapper>
        </Column>
      </Container>
    </>
  );
};

export { AuthLayout };
