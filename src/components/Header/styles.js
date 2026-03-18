import { Link } from 'react-router-dom';
import styled  from 'styled-components';

export const Container = styled.div`
   
    width: 100%;
    max-width: 80%;
    height: 47px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`

export const Row = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

export const Wrapper = styled.div`
    background-color: #151515;
    width: 100%;
    height: 47px;
    display:flex;
    justify-content: center;
    align-items: center;
`

export const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    margin-right: 24px;
`

export const BuscarInputContainer = styled.div`
    width: 275px;
    height: 30px;
    background: #2D2D37;
    border-radius: 8px;
    padding: 2px 5px;
    margin: 0 12px;

    display:flex;
`

export const MenuText = styled.span`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #FFFFFF;
`

export const MenuLink = styled(Link)`
    font-family: 'Open Sans';
    font-style: normal;
    font-size: 12px;
    line-height: 25px;
    color: #FFFFFF;
    margin-right: 12px;
    text-decoration: none;
`

export const UserMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    span {
        color: #FFFFFF;
        font-family: 'Open Sans', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
    }
`

export const LogoutButton = styled.button`
    background: transparent;
    border: 0;
    color: #FFFFFF;
    cursor: pointer;
    font-family: 'Open Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
`

export const UserPicture = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 22px;
    border: 3px solid #FFFFFF;
`

export const Input = styled.input`
    background: transparent;
    flex: 1;
    border: 0;
    color: #FFFFFF;
    outline: none;

    &::placeholder {
        color: #FFFFFF80;
    }
`
