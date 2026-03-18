import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { MESSAGES } from '../../constants/messages';
import { theme } from '../../styles/theme';
import { AppErrorBoundary } from './index';

const renderWithProviders = (component) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{component}</MemoryRouter>
    </ThemeProvider>,
  );

const ThrowError = () => {
  throw new Error('boom');
};

test('renders the fallback UI when a child component throws', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  renderWithProviders(
    <AppErrorBoundary>
      <ThrowError />
    </AppErrorBoundary>,
  );

  expect(screen.getByText(MESSAGES.app.unexpectedError)).toBeInTheDocument();
  expect(screen.getByText(MESSAGES.app.unexpectedErrorHelp)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: MESSAGES.ui.reloadPage })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: MESSAGES.ui.backHome })).toBeInTheDocument();

  consoleErrorSpy.mockRestore();
});
