import React from 'react'
import { Controller } from "react-hook-form";

import {ErrorText, InputContainer, InputText, IconContainer } from './styles';

const Input = ({leftIcon, name, control, errorMessage, rules, ...rest}) => {
  return (
    <>
      <InputContainer $hasError={Boolean(errorMessage)}>
          {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
          <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) =>  <InputText {...field} {...rest} aria-invalid={Boolean(errorMessage)} />}
        />
      </InputContainer>
      {errorMessage ? <ErrorText role="alert">{errorMessage}</ErrorText> : null}
    </>
  )
}

export { Input }; 
