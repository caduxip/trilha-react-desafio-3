import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 120px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;

  @media (max-width: 960px) {
    max-width: 90%;
    margin-top: 64px;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 420px;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  width: 100%;
  margin-bottom: 20px;
  line-height: 44px;

  @media (max-width: 960px) {
    font-size: 28px;
    line-height: 38px;
  }
`;

export const TitleHighlight = styled.span`
  color: #e4105d;
`;

export const TextContent = styled.p`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  width: 100%;
  margin-bottom: 20px;
`;

export const Banner = styled.img`
  width: 100%;
  max-width: 560px;
  height: auto;

  @media (max-width: 960px) {
    max-width: 100%;
  }
`;
