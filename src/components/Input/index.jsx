// Input compartilhado integrado ao react-hook-form.
import React from 'react';
import { Controller } from 'react-hook-form';

import {
  ErrorText,
  FieldLabel,
  FieldWrapper,
  InputContainer,
  InputText,
  IconContainer,
} from './styles';

const Input = ({ leftIcon, label, name, control, errorMessage, ...rest }) => {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <FieldWrapper>
      {/* O label continua opcional para preservar flexibilidade do componente,
          mas os formulários do projeto usam esse texto para melhorar semântica. */}
      {label ? <FieldLabel htmlFor={inputId}>{label}</FieldLabel> : null}
      <InputContainer $hasError={Boolean(errorMessage)}>
        {leftIcon ? <IconContainer>{leftIcon}</IconContainer> : null}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            // O Controller conecta este input visual ao estado interno do formulário.
            <InputText
              id={inputId}
              {...field}
              {...rest}
              aria-describedby={errorMessage ? errorId : undefined}
              aria-invalid={Boolean(errorMessage)}
            />
          )}
        />
      </InputContainer>
      {errorMessage ? (
        <ErrorText id={errorId} role="alert">
          {errorMessage}
        </ErrorText>
      ) : null}
    </FieldWrapper>
  );
};

export { Input };
