// Testes do contrato do botão reutilizável.
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../styles/theme';
import { Button } from './index';

const renderWithTheme = (component) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

test('renders the button in loading state and disables interaction', () => {
  renderWithTheme(<Button title="Salvar" isLoading />);

  const button = screen.getByRole('button', { name: 'Salvar' });

  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-busy', 'true');
});

test('renders leading and trailing icons together with the label', () => {
  renderWithTheme(
    <Button
      iconLeft={<span data-testid="left-icon">L</span>}
      iconRight={<span data-testid="right-icon">R</span>}
      title="Acao"
    />,
  );

  expect(screen.getByRole('button', { name: 'Acao' })).toBeInTheDocument();
  expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  expect(screen.getByTestId('right-icon')).toBeInTheDocument();
});
