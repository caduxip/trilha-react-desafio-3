import styled, {css}  from 'styled-components';

export const ButtonContainer = styled.button`
    background: #565656;
    border: 0;
    border-radius: 22px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-decoration: none;

    color: #FFFFFF;
    padding: 2px 12px;
    min-height: 32px;
    min-width: 120px;
    max-width: ${({$fullWidth}) => ($fullWidth ? '275px' : 'none')};
    width: ${({$fullWidth}) => ($fullWidth ? '100%' : 'auto')};

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
    
    ${({variant}) => variant !== "primary" && css`
        min-width: 167px;
        height: 33px;
        
        background: #E4105D;

        &::after {
            content: '';
            position: absolute;
            border: 1px solid #E4105D;
            top: -5px;
            left: -6px;
            width: calc(100% + 10px);
            height: calc(100% + 10px);
            border-radius: 22px;
        }
    `}
`
