import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  background-color: #3b4651;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
`;

export const ImageBackground = styled.div`
  width: 100%;
  height: 180px;
  background:
    radial-gradient(circle at top right, rgba(228, 16, 93, 0.35), transparent 38%),
    linear-gradient(135deg, #24212f 0%, #353f4b 100%);
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;

  div {
    margin-left: 12px;
  }

  h4 {
    color: #ffffff;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
  }

  p {
    color: #ffffff;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`;

export const UserPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 22px;
  border: 3px solid #ffffff;
`;

export const PostInfo = styled.div`
  margin-bottom: 12px;

  h4 {
    color: #ffffff;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`;

export const MetaInfo = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  h4 {
    color: #ffffff80;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  }

  p {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
  }
`;
