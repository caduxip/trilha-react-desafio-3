// Estilos do fallback de erro global.
import styled from 'styled-components';

export const FallbackContainer = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidthMobile};
  min-height: calc(100vh - ${({ theme }) => theme.sizes.headerHeight});
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.pageTopMobile} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  line-height: ${({ theme }) => theme.typography.title.lineHeight};
  font-weight: 700;
`;

export const Description = styled.p`
  max-width: 540px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;
