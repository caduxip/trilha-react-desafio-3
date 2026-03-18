import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 3px solid ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`;

export const NameText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
`;

export const Progress = styled.div`
  width: min(180px, 100%);
  height: 6px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.sm};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ percentual }) => percentual}%;
    height: 6px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background-color: ${({ theme }) => theme.colors.success};
  }
`;

export const PercentageText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
