export const getErrorMessage = (error: unknown, initialMessage = 'An error occurred'): string => {
  if (error instanceof Error) {
    if ('cause' in error && error.cause instanceof Error) {
      return `${error.message}: ${error.cause.message}`;
    }
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      return String(error.message);
    }
    if ('code' in error && 'input' in error) {
      return `${String(error.code)}: ${String(error.input)}`;
    }
  }

  return initialMessage;
};
