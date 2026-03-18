import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surfaceCard};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const ImageBackground = styled.div`
  width: 100%;
  height: 180px;
  background:
    radial-gradient(circle at top right, rgba(228, 16, 93, 0.35), transparent 38%),
    linear-gradient(135deg, ${({ theme }) => theme.colors.surfaceMuted} 0%, #353f4b 100%);
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const AuthorMeta = styled.div`
  margin-left: ${({ theme }) => theme.spacing.md};

  h4 {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`;

export const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 3px solid ${({ theme }) => theme.colors.text};
`;

export const PostInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h4 {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
  }

`;

export const PostSummary = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const MetaInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const MetaLeft = styled.h4`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
`;

export const LikeCount = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;
