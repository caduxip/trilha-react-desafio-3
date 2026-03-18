import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ROUTER_FUTURE_FLAGS } from '../routes/future';
import { theme } from '../styles/theme';

const renderWithTheme = (component) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

const renderWithRouterAndTheme = (component, { route = '/' } = {}) =>
  render(
    // Este helper junta os providers mais repetidos da suíte:
    // roteamento em memória e tema visual.
    <ThemeProvider theme={theme}>
      <MemoryRouter future={ROUTER_FUTURE_FLAGS} initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </ThemeProvider>,
  );

export { renderWithRouterAndTheme, renderWithTheme };
