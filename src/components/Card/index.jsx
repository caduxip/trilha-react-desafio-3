import React from 'react';
import { FiThumbsUp } from 'react-icons/fi';

import {
  CardContainer,
  ImageBackground,
  Content,
  UserInfo,
  UserPicture,
  PostInfo,
  MetaInfo,
} from './styles';

const Card = ({ post }) => {
  const tagsText = post.tags.map((tag) => `#${tag}`).join(' ');

  return (
    <CardContainer>
      <ImageBackground />
      <Content>
        <UserInfo>
          <UserPicture src={post.authorAvatar} alt={`Avatar de ${post.authorName}`} />
          <div>
            <h4>{post.authorName}</h4>
            <p>{post.publishedAt}</p>
          </div>
        </UserInfo>

        <PostInfo>
          <h4>{post.title}</h4>
          <p>
            {post.summary} <strong>Saiba mais</strong>
          </p>
        </PostInfo>

        <MetaInfo>
          <h4>{tagsText}</h4>
          <p>
            <FiThumbsUp /> {post.likes}
          </p>
        </MetaInfo>
      </Content>
    </CardContainer>
  );
};

export { Card };
