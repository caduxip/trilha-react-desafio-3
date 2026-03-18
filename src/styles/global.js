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
  }

  button,
  input {
    font: inherit;
  }

  a {
    color: inherit;
  }
`
