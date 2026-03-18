const createFieldError = (message) => ({
  type: 'validation',
  message,
});

const composeValidators =
  (...validators) =>
  (value, values) => {
    for (const validator of validators) {
      const errorMessage = validator(value, values);

      if (errorMessage) {
        return errorMessage;
      }
    }

    return null;
  };

const required =
  (message) =>
  (value) => {
    if (typeof value === 'string') {
      return value.trim() ? null : message;
    }

    return value ? null : message;
  };

const minLength =
  (length, message) =>
  (value) => {
    if (typeof value !== 'string') {
      return message;
    }

    return value.trim().length >= length ? null : message;
  };

const email =
  (message) =>
  (value) => {
    if (typeof value !== 'string') {
      return message;
    }

    return /\S+@\S+\.\S+/.test(value.trim()) ? null : message;
  };

const createSchemaResolver = (schema) => async (values) => {
  const errors = {};

  Object.entries(schema).forEach(([fieldName, validator]) => {
    const errorMessage = validator(values[fieldName], values);

    if (errorMessage) {
      errors[fieldName] = createFieldError(errorMessage);
    }
  });

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

export {
  composeValidators,
  createSchemaResolver,
  email,
  minLength,
  required,
};
