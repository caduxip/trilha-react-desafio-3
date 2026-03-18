// Testa o fallback exibido quando um componente lança erro em renderização.
import { screen } from '@testing-library/react';

import { MESSAGES } from '../../constants/messages';
import { logger } from '../../lib/observability/logger';
import { renderWithRouterAndTheme } from '../../test/renderWithProviders';
import { AppErrorBoundary } from './index';

jest.mock('../../lib/observability/logger', () => ({
  logger: {
    reportRuntimeError: jest.fn(),
  },
}));

const ThrowError = () => {
  throw new Error('boom');
};

test('renders the fallback UI when a child component throws', () => {
  // O React escreve no console quando um componente quebra de propósito em teste.
  // Silenciamos isso aqui para deixar a saída da suíte mais legível.
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  renderWithRouterAndTheme(
    <AppErrorBoundary>
      <ThrowError />
    </AppErrorBoundary>,
  );

  expect(screen.getByText(MESSAGES.app.unexpectedError)).toBeInTheDocument();
  expect(screen.getByText(MESSAGES.app.unexpectedErrorHelp)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: MESSAGES.ui.reloadPage })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: MESSAGES.ui.backHome })).toBeInTheDocument();
  expect(logger.reportRuntimeError).toHaveBeenCalledTimes(1);

  consoleErrorSpy.mockRestore();
});
