// Este arquivo roda antes de cada teste.
// Ele concentra extensões globais da suíte para evitar repetição
// e deixa explícito quais matchers extras fazem parte do ambiente de teste.
// Habilita matchers extras do Testing Library, como `toBeInTheDocument`.
import '@testing-library/jest-dom';
// Habilita matchers como `toHaveNoViolations` para os testes automatizados de acessibilidade.
import 'jest-axe/extend-expect';
