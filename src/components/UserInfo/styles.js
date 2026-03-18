import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`;

export const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 22px;
  border: 3px solid #ffffff;
  margin-right: 12px;
`;

export const NameText = styled.div`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
`;

export const Progress = styled.div`
  width: 180px;
  height: 6px;
  background-color: #ffffff;
  border-radius: 3px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ percentual }) => percentual}%;
    height: 6px;
    border-radius: 3px;
    background-color: #23dd7a;
  }
`;

export const PercentageText = styled.p`
  margin-top: 8px;
  color: #ffffff80;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
