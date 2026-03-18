// Estilos estruturais do layout de autenticação.
import styled from 'styled-components';

export const Container = styled.main.attrs({
  id: 'page-content',
})`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  margin: ${({ theme }) => `${theme.spacing.pageTop} auto 0`};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.pageGap};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.sizes.containerWidthMobile};
    margin-top: ${({ theme }) => theme.spacing.pageTopMobile};
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

export const FormWrapper = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.formWidth};
  margin-left: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
    margin-left: 0;
  }
`;

export const HeroTitle = styled.h1`
  max-width: 90%;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  font-style: normal;
  font-weight: 700;
  line-height: ${({ theme }) => theme.typography.title.lineHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
    font-size: ${({ theme }) => theme.typography.titleMobile.fontSize};
    line-height: ${({ theme }) => theme.typography.titleMobile.lineHeight};
  }
`;
