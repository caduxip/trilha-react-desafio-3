import React from 'react';

import { Container, NameText, PercentageText, Progress, UserPicture } from './styles';

const UserInfo = ({ avatar, image, name, nome, percentage, percentual }) => {
  const displayName = name ?? nome;
  const displayAvatar = avatar ?? image;
  const normalizedPercentage = Math.max(0, Math.min(percentage ?? percentual, 100));

  return (
    <Container>
      <UserPicture src={displayAvatar} alt={`Avatar de ${displayName}`} />
      <div>
        <NameText>{displayName}</NameText>
        <Progress
          aria-label={`Aproveitamento de ${displayName}`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={normalizedPercentage}
          percentual={normalizedPercentage}
          role="progressbar"
        />
        <PercentageText>{normalizedPercentage}% de aproveitamento</PercentageText>
      </div>
    </Container>
  );
};

export { UserInfo };
