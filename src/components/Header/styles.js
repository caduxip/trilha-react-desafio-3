import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SkipLink = styled.a`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: ${({ theme }) => theme.spacing.sm};
  transform: translateY(-200%);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  z-index: 10;

  &:focus {
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.sizes.containerWidthMobile};
    padding: ${({ theme }) => `${theme.spacing.md} 0`};
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.headerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

export const BuscarInputContainer = styled.div`
  width: ${({ theme }) => theme.sizes.controlWidth};
  height: ${({ theme }) => theme.sizes.inputHeight};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 2px 5px;
  margin: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    margin: 0;
    order: 3;
  }
`;

export const MenuText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

export const MenuLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  margin-right: ${({ theme }) => theme.spacing.md};
  text-decoration: none;
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: auto;
    width: 100%;
    justify-content: flex-end;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  text-decoration: underline;
`;

export const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 3px solid ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  background: transparent;
  flex: 1;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
