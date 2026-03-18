import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 80%;
  min-height: 47px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 960px) {
    max-width: 90%;
    padding: 12px 0;
    align-items: flex-start;
    gap: 16px;
  }

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  @media (max-width: 720px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Wrapper = styled.div`
  background-color: #151515;
  width: 100%;
  min-height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const BuscarInputContainer = styled.div`
  width: 275px;
  height: 30px;
  background: #2d2d37;
  border-radius: 8px;
  padding: 2px 5px;
  margin: 0 12px;
  display: flex;

  @media (max-width: 720px) {
    width: 100%;
    margin: 0;
    order: 3;
  }
`;

export const MenuText = styled.span`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
`;

export const MenuLink = styled(Link)`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  line-height: 25px;
  margin-right: 12px;
  text-decoration: none;
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    color: #ffffff;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  }

  @media (max-width: 720px) {
    margin-left: auto;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 0;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
`;

export const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 22px;
  border: 3px solid #ffffff;
`;

export const Input = styled.input`
  background: transparent;
  flex: 1;
  border: 0;
  color: #ffffff;
  outline: none;

  &::placeholder {
    color: #ffffff80;
  }
`;
