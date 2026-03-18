import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 120px auto 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 960px) {
    max-width: 90%;
    margin-top: 64px;
    flex-direction: column;
  }
`;

export const Title = styled.h3`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 24px;
`;

export const TitleHighlight = styled.h3`
  color: #ffffff70;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 24px;
`;

export const Column = styled.div`
  flex: ${({ flex }) => flex};
  padding-right: 24px;

  @media (max-width: 960px) {
    padding-right: 0;
    margin-bottom: 32px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background-color: #2d2d37;
  margin-bottom: 24px;
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 20px;
`;

export const EmptyText = styled.p`
  color: #ffffff80;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 20px;
`;
