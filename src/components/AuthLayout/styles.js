import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 120px auto 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;

  @media (max-width: 960px) {
    max-width: 90%;
    margin-top: 64px;
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  margin-left: auto;

  @media (max-width: 960px) {
    max-width: 100%;
    margin-left: 0;
  }
`;

export const HeroTitle = styled.h2`
  max-width: 90%;
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;

  @media (max-width: 960px) {
    max-width: 100%;
    font-size: 28px;
    line-height: 38px;
  }
`;
