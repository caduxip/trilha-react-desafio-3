import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  margin: ${({ theme }) => `${theme.spacing.pageTop} auto 0`};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.sizes.containerWidthMobile};
    margin-top: ${({ theme }) => theme.spacing.pageTopMobile};
    flex-direction: column;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const TitleHighlight = styled.h3`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const Column = styled.div`
  flex: ${({ flex }) => flex};
  padding-right: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StatusCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  line-height: 20px;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  line-height: 20px;
`;
