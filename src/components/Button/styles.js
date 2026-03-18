import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
  background: ${({ theme }) => theme.colors.buttonNeutral};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  min-height: 32px;
  min-width: 120px;
  max-width: ${({ $fullWidth, theme }) => ($fullWidth ? theme.sizes.controlWidth : 'none')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${({ variant, theme }) =>
    variant !== 'primary' &&
    css`
      min-width: 167px;
      height: 33px;
      background: ${theme.colors.primary};

      &::after {
        content: '';
        position: absolute;
        border: 1px solid ${theme.colors.primary};
        top: -5px;
        left: -6px;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        border-radius: ${theme.radius.pill};
      }
    `}
`;
