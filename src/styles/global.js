import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
  }

  button,
  input {
    font: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
  }

  a,
  button,
  input {
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.focus};
      outline-offset: 3px;
    }
  }
`
