import React from 'react'

import { ButtonContainer } from './styles';

const Button = ({title,variant = "primary", fullWidth = false, children, ...rest}) => {
  return (
    <ButtonContainer variant={variant} $fullWidth={fullWidth} {...rest}>
      {children ?? title}
    </ButtonContainer>
  )
}

export { Button }
