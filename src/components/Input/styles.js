import styled from 'styled-components';

export const InputContainer = styled.div`
    width: 100%;
    max-width: 275px;
    height: 30px;
    border-bottom: 1px solid ${({$hasError}) => ($hasError ? '#FF6B6B' : '#3B3450')};

    display:flex;
    align-items: center;
    margin-bottom: 4px;
`

export const IconContainer = styled.div`
    margin-right: 10px;
`

export const InputText = styled.input`
    background-color: transparent;
    color: #FFFFFF;
    flex:1;
    border: 0;
    height: 30px;
    outline: none;

    &::placeholder {
        color: #FFFFFF80;
    }
    
`

export const ErrorText = styled.span`
    display: block;
    width: 100%;
    max-width: 275px;
    margin-bottom: 16px;
    color: #FF6B6B;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
`
