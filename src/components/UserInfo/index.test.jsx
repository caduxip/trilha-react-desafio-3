// Testes do bloco visual de ranking.
import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../test/renderWithProviders';
import { UserInfo } from './index';

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
