import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.pageTop} 0 ${theme.spacing.pageGap}`};
`;

const CatalogIntro = styled.section`
  width: ${({ theme }) => theme.sizes.containerWidth};
  max-width: 1120px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.sizes.containerWidthMobile};
    padding-top: ${({ theme }) => theme.spacing.pageTopMobile};
  }
`;

const IntroBadge = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  line-height: ${({ theme }) => theme.typography.title.lineHeight};
  margin: 0;
`;

const IntroText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.subtitle.fontSize};
  line-height: ${({ theme }) => theme.typography.subtitle.lineHeight};
  margin: 0;
  max-width: 760px;
`;

const CatalogMain = styled.div`
  width: ${({ theme }) => theme.sizes.containerWidth};
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.sizes.containerWidthMobile};
  }
`;

const SectionHeader = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  line-height: 1.3;
  margin: 0;
`;

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  max-width: 840px;
`;

const TokenGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TokenItem = styled.div`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.lg};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ComponentGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ExampleCard = styled.article`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const ExampleStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ExampleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ExampleSurface = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const WideExample = styled.section`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const HelperText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

const PropsList = styled.ul`
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.xxl};
`;

export {
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
};
