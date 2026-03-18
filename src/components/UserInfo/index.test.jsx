// Testes do bloco visual de ranking.
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../styles/theme';
import { UserInfo } from './index';

const renderWithTheme = (component) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

test('supports the normalized user info contract with english props', () => {
  renderWithTheme(
    <UserInfo avatar="https://example.com/avatar.png" name="Pablo Henrique" percentage={72} />,
  );

  expect(screen.getByText('Pablo Henrique')).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '72');
});

test('clamps the percentage value to the supported range', () => {
  renderWithTheme(
    <UserInfo image="https://example.com/avatar.png" nome="Pablo Henrique" percentual={140} />,
  );

  expect(screen.getByText('100% de aproveitamento')).toBeInTheDocument();
});
