import React from 'react'

import { ButtonContainer } from './styles';

const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  iconLeft,
  iconRight,
  isLoading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <ButtonContainer
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
      aria-busy={isLoading}
      disabled={disabled || isLoading}
      {...rest}
    >
      {iconLeft ? <span aria-hidden="true">{iconLeft}</span> : null}
      {children ?? title}
      {iconRight ? <span aria-hidden="true">{iconRight}</span> : null}
    </ButtonContainer>
  )
}

export { Button }
