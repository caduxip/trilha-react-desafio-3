// Estilos do loader de página.
import styled from 'styled-components';

export const LoaderContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.sizes.headerHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-style: normal;
  font-weight: 600;
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`;
