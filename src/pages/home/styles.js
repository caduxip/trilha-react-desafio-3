import styled from 'styled-components';

export const Container = styled.main.attrs({
  id: 'page-content',
})`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  margin: ${({ theme }) => `${theme.spacing.pageTop} auto 0`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.pageGap};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.sizes.containerWidthMobile};
    margin-top: ${({ theme }) => theme.spacing.pageTopMobile};
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 420px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  font-style: normal;
  font-weight: 700;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.title.lineHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.titleMobile.fontSize};
    line-height: ${({ theme }) => theme.typography.titleMobile.lineHeight};
  }
`;

export const TitleHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const TextContent = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-style: normal;
  font-weight: 400;
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Banner = styled.img`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.bannerWidth};
  height: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
  }
`;
