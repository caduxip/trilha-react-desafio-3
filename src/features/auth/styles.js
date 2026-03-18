import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  font-style: normal;
  font-weight: 700;
  line-height: ${({ theme }) => theme.typography.title.lineHeight};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.titleMobile.fontSize};
    line-height: ${({ theme }) => theme.typography.titleMobile.lineHeight};
  }
`;

export const FormSubtitle = styled.p`
  margin-bottom: 35px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.subtitle.fontSize};
  font-style: normal;
  font-weight: 400;
  line-height: ${({ theme }) => theme.typography.subtitle.lineHeight};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.subtitleMobile.fontSize};
    line-height: ${({ theme }) => theme.typography.subtitleMobile.lineHeight};
  }
`;

export const StatusText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ $error, theme }) => ($error ? theme.colors.danger : theme.colors.success)};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
`;

export const HelperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.warning};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`;

export const HelperLink = styled(Link)`
  color: ${({ theme }) => theme.colors.success};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  text-decoration: none;
`;

export const LegalText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const AccentText = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
`;

export const InlineText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
  text-decoration: none;
`;
