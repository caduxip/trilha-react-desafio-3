import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  margin-bottom: 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
  color: #ffffff;

  @media (max-width: 960px) {
    font-size: 28px;
    line-height: 38px;
  }
`;

export const FormSubtitle = styled.p`
  margin-bottom: 35px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  color: #ffffff;

  @media (max-width: 960px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const StatusText = styled.p`
  margin-top: 16px;
  color: ${({ $error }) => ($error ? '#ff6b6b' : '#23dd7a')};
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
`;

export const HelperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HelperText = styled.span`
  color: #e5e044;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`;

export const HelperLink = styled(Link)`
  color: #23dd7a;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  text-decoration: none;
`;

export const LegalText = styled.p`
  margin-top: 20px;
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const AccentText = styled.span`
  color: #23dd7a;
  font-weight: 700;
`;

export const InlineText = styled.p`
  margin-top: 12px;
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const InlineLink = styled(Link)`
  color: #23dd7a;
  font-weight: 700;
  text-decoration: none;
`;
