// Card visual que representa uma publicação no feed.
import React from 'react';
import { FiThumbsUp } from 'react-icons/fi';

import {
  AuthorMeta,
  CardContainer,
  ImageBackground,
  Content,
  LikeCount,
  MetaLeft,
  PostSummary,
  UserInfo,
  UserPicture,
  PostInfo,
  MetaInfo,
} from './styles';

const Card = ({ post }) => {
  const {
    authorAvatar,
    authorName,
    likes = 0,
    publishedAt,
    summary,
    tags = [],
    title,
  } = post;
  const tagsText = tags.map((tag) => `#${tag}`).join(' ');

  return (
    // Usamos `article` porque cada post é uma unidade de conteúdo independente.
    <CardContainer as="article">
      <ImageBackground />
      <Content>
        <UserInfo>
          <UserPicture src={authorAvatar} alt={`Avatar de ${authorName}`} />
          <AuthorMeta>
            <h4>{authorName}</h4>
            <p>{publishedAt}</p>
          </AuthorMeta>
        </UserInfo>

        <PostInfo>
          <h4>{title}</h4>
          <PostSummary>
            {summary} <strong>Saiba mais</strong>
          </PostSummary>
        </PostInfo>

        <MetaInfo>
          <MetaLeft>{tagsText || 'Sem tags'}</MetaLeft>
          <LikeCount>
            <FiThumbsUp /> {likes}
          </LikeCount>
        </MetaInfo>
      </Content>
    </CardContainer>
  );
};

export { Card };
