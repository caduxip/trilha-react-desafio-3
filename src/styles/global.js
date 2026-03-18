import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: #1E192C;
    color: #FFFFFF;
    font-family: 'Open Sans', sans-serif;
  }

  button,
  input {
    font: inherit;
  }
`
