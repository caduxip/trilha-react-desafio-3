import styled, { css } from 'styled-components';

const BUTTON_SIZES = {
  sm: css`
    min-height: 28px;
    min-width: 96px;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.small.fontSize};
  `,
  md: css`
    min-height: 32px;
    min-width: 120px;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: 14px;
  `,
  lg: css`
    min-height: 40px;
    min-width: 160px;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  `,
};

const BUTTON_VARIANTS = {
  primary: css`
    background: ${({ theme }) => theme.colors.buttonNeutral};
    color: ${({ theme }) => theme.colors.text};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};

    &::after {
      content: '';
      position: absolute;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      top: -5px;
      left: -6px;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      border-radius: ${({ theme }) => theme.radius.pill};
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }
  `,
};

export const ButtonContainer = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
  text-decoration: none;
  max-width: ${({ $fullWidth, theme }) => ($fullWidth ? theme.sizes.controlWidth : 'none')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  line-height: 1;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    background-color ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  ${({ $size = 'md' }) => BUTTON_SIZES[$size] ?? BUTTON_SIZES.md}
  ${({ $variant = 'primary' }) => BUTTON_VARIANTS[$variant] ?? BUTTON_VARIANTS.primary}

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }
`;
