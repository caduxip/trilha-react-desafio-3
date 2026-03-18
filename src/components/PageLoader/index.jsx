// Fallback mostrado enquanto páginas lazy ainda não terminaram de carregar.
import React from 'react';

import { LoaderContainer } from './styles';

const PageLoader = () => {
  return <LoaderContainer>Carregando página...</LoaderContainer>;
};

export { PageLoader };
