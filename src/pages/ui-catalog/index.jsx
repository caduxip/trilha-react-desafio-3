import React from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiMail, FiUser } from 'react-icons/fi';

import { AsyncState } from '../../components/AsyncState';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { UserInfo } from '../../components/UserInfo';

import {
  CatalogIntro,
  CatalogMain,
  ComponentGrid,
  ExampleCard,
  ExampleRow,
  ExampleStack,
  ExampleSurface,
  HelperText,
  IntroBadge,
  IntroText,
  PageContainer,
  PageTitle,
  PropsList,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  TokenGrid,
  TokenItem,
  WideExample,
} from './styles';

const samplePost = {
  authorAvatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
  authorName: 'Pablo Henrique',
  likes: 24,
  publishedAt: 'Há 8 minutos',
  summary: 'Resumo usado pela vitrine para mostrar como o Card se comporta com conteúdo real.',
  tags: ['react', 'frontend', 'styled-components'],
  title: 'Projeto para curso de HTML e CSS',
};

const sampleRankingUser = {
  avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
  name: 'Pablo Henrique',
  percentage: 78,
};

const buttonVariants = [
  { title: 'Primary', variant: 'primary' },
  { title: 'Secondary', variant: 'secondary' },
  { title: 'Ghost', variant: 'ghost' },
];

const buttonSizes = ['sm', 'md', 'lg'];

const tokenHighlights = [
  { title: 'Primary', value: '#e4105d' },
  { title: 'Surface', value: '#151515' },
  { title: 'Text', value: '#ffffff' },
  { title: 'Breakpoints', value: '640px / 720px / 960px' },
];

const UiCatalog = () => {
  // O catálogo usa um formulário simples só para demonstrar
  // o comportamento real do Input compartilhado com react-hook-form.
  const { control } = useForm({
    defaultValues: {
      email: 'junior@dio.dev',
      name: 'Dev Júnior',
    },
  });

  return (
    <>
      <Header />
      <PageContainer as="main" id="page-content">
        <CatalogIntro>
          <IntroBadge>UI base</IntroBadge>
          <PageTitle>Catálogo de componentes</PageTitle>
          <IntroText>
            Esta página funciona como uma vitrine interna da biblioteca visual do projeto. A ideia é
            ajudar quem está entrando na base a entender quais peças já existem e como reutilizá-
            las antes de criar algo novo.
          </IntroText>
        </CatalogIntro>

        <CatalogMain>
          <SectionHeader>
            <SectionTitle>Princípios da UI compartilhada</SectionTitle>
            <SectionDescription>
              Componentes globais devem resolver padrões visuais repetidos, manter semântica
              acessível e evitar carregar regras específicas de uma feature.
            </SectionDescription>
          </SectionHeader>

          <TokenGrid>
            {tokenHighlights.map((token) => (
              <TokenItem key={token.title}>
                <strong>{token.title}</strong>
                <span>{token.value}</span>
              </TokenItem>
            ))}
          </TokenGrid>

          <ComponentGrid>
            <ExampleCard>
              <SectionTitle as="h2">Button</SectionTitle>
              <HelperText>
                Use variantes e tamanhos existentes antes de criar um botão específico por tela.
              </HelperText>
              <ExampleStack>
                <ExampleRow>
                  {buttonVariants.map((button) => (
                    <Button key={button.title} title={button.title} variant={button.variant} />
                  ))}
                </ExampleRow>
                <ExampleRow>
                  {buttonSizes.map((size) => (
                    <Button key={size} title={`Tamanho ${size}`} size={size} variant="ghost" />
                  ))}
                </ExampleRow>
                <ExampleRow>
                  <Button title="Com ícone" variant="secondary" iconRight={<FiArrowRight />} />
                  <Button title="Carregando" isLoading variant="primary" />
                </ExampleRow>
              </ExampleStack>
              <PropsList>
                <li>`variant`: `primary`, `secondary`, `ghost`</li>
                <li>`size`: `sm`, `md`, `lg`</li>
                <li>`iconLeft`, `iconRight`, `isLoading`, `fullWidth`</li>
              </PropsList>
            </ExampleCard>

            <ExampleCard>
              <SectionTitle as="h2">Input</SectionTitle>
              <HelperText>
                O componente visual do campo continua separado das regras de validação, que ficam no
                schema ou no hook da feature.
              </HelperText>
              <ExampleStack>
                <Input
                  autoComplete="name"
                  control={control}
                  label="Nome completo"
                  leftIcon={<FiUser />}
                  name="name"
                  placeholder="Nome completo"
                />
                <Input
                  autoComplete="email"
                  control={control}
                  label="E-mail"
                  leftIcon={<FiMail />}
                  name="email"
                  placeholder="E-mail"
                />
                <Input
                  autoComplete="email"
                  control={control}
                  errorMessage="Exemplo de mensagem de erro acessível"
                  label="Campo com erro"
                  leftIcon={<FiMail />}
                  name="emailError"
                  placeholder="Campo com erro"
                />
              </ExampleStack>
              <PropsList>
                <li>`label`, `name`, `control`, `errorMessage`</li>
                <li>`leftIcon` para apoio visual sem interferir no valor</li>
                <li>labels e ids já suportam leitura acessível</li>
              </PropsList>
            </ExampleCard>
          </ComponentGrid>

          <WideExample>
            <SectionTitle as="h2">Estados assíncronos</SectionTitle>
            <SectionDescription>
              Use `AsyncState` quando uma tela precisar exibir loading, erro ou vazio sem repetir
              marcação e CTA.
            </SectionDescription>
            <ExampleSurface>
              <AsyncState
                description="Este é o estado de carregamento sem ação."
                title="Carregando..."
              />
              <AsyncState
                actionLabel="Tentar novamente"
                description="Exemplo de falha padronizada com CTA de retry."
                onAction={() => {}}
                title="Falha ao carregar"
              />
              <AsyncState
                description="Quando não houver conteúdo, a tela pode informar isso sem parecer quebrada."
                title="Sem resultados"
              />
            </ExampleSurface>
          </WideExample>

          <ComponentGrid>
            <ExampleCard>
              <SectionTitle as="h2">Card</SectionTitle>
              <HelperText>
                O `Card` recebe dados já normalizados pela camada de domínio. Isso evita acoplamento
                com o contrato bruto da API.
              </HelperText>
              <Card post={samplePost} />
            </ExampleCard>

            <ExampleCard>
              <SectionTitle as="h2">UserInfo</SectionTitle>
              <HelperText>
                O componente do ranking já cuida de semântica de progresso e normaliza percentuais.
              </HelperText>
              <ExampleSurface>
                <UserInfo {...sampleRankingUser} />
                <UserInfo
                  avatar="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                  name="Open Source"
                  percentage={100}
                />
              </ExampleSurface>
            </ExampleCard>
          </ComponentGrid>

          <WideExample>
            <SectionTitle as="h2">Como evoluir a UI base</SectionTitle>
            <SectionDescription>
              Antes de criar um novo componente compartilhado, confirme se ele resolve um padrão
              real do projeto, documente seu contrato e adicione um teste quando houver
              comportamento relevante.
            </SectionDescription>
            <PropsList>
              <li>prefira composição e variantes, não componentes duplicados por tela</li>
              <li>mantenha componentes globais livres de regra de negócio específica</li>
              <li>documente props novas neste catálogo e no guia `docs/ui-components.md`</li>
            </PropsList>
          </WideExample>
        </CatalogMain>
      </PageContainer>
    </>
  );
};

export { UiCatalog };
