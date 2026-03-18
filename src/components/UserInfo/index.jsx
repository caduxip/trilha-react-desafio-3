import React from 'react';

import { Container, NameText, PercentageText, Progress, UserPicture } from './styles';

const UserInfo = ({ nome, image, percentual }) => {
  const normalizedPercentage = Math.max(0, Math.min(percentual, 100));

  return (
    <Container>
      <UserPicture src={image} alt={`Avatar de ${nome}`} />
      <div>
        <NameText>{nome}</NameText>
        <Progress percentual={normalizedPercentage} />
        <PercentageText>{normalizedPercentage}% de aproveitamento</PercentageText>
      </div>
    </Container>
  );
};

export { UserInfo };
