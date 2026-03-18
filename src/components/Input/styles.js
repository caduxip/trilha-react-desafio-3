import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.controlWidth};
  height: ${({ theme }) => theme.sizes.inputHeight};
  border-bottom: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const InputText = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  border: 0;
  height: ${({ theme }) => theme.sizes.inputHeight};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ErrorText = styled.span`
  display: block;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.controlWidth};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-style: normal;
  font-weight: 600;
  line-height: ${({ theme }) => theme.typography.small.lineHeight};
`;
