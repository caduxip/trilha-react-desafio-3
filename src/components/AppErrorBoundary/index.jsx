// Boundary global de erro usada para evitar tela branca total.
import { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MESSAGES } from '../../constants/messages';
import { ROUTES } from '../../routes/paths';
import { Button } from '../Button';

import {
  Actions,
  Description,
  FallbackContainer,
  Title,
} from './styles';

class ErrorBoundaryRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Sinaliza ao React que a próxima renderização deve mostrar o fallback.
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(error);
    }
  }

  handleReload = () => {
    // Força um reload completo como estratégia simples de recuperação.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <FallbackContainer>
          <Title>{MESSAGES.app.unexpectedError}</Title>
          <Description>{MESSAGES.app.unexpectedErrorHelp}</Description>

          <Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={this.handleReload}
              title={MESSAGES.ui.reloadPage}
            />
            <Button as={Link} to={ROUTES.home} title={MESSAGES.ui.backHome} />
          </Actions>
        </FallbackContainer>
      );
    }

    return this.props.children;
  }
}

const AppErrorBoundary = ({ children }) => {
  const location = useLocation();

  // A cada troca de rota, a boundary é resetada.
  return <ErrorBoundaryRoot key={location.pathname}>{children}</ErrorBoundaryRoot>;
};

export { AppErrorBoundary };
