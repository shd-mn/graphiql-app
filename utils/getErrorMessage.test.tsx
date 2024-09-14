import { describe, it, expect } from 'vitest';
import { getErrorMessage } from '@/utils/getErrorMessage';

describe('getErrorMessage', () => {
  it('should return the error message from an Error instance', () => {
    const error = new Error('Something went wrong');
    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  it('should return a formatted message if the Error has a cause', () => {
    const causeError = new Error('Cause of the issue');
    const error = new Error('Main error');
    error.cause = causeError;
    expect(getErrorMessage(error)).toBe('Main error: Cause of the issue');
  });

  it('should return the message from an Error with no cause', () => {
    const error = new Error('Error with no cause');
    expect(getErrorMessage(error)).toBe('Error with no cause');
  });

  it('should return the message from an object with a message property', () => {
    const error = { message: 'Custom error message' };
    expect(getErrorMessage(error)).toBe('Custom error message');
  });

  it('should return a formatted message from an object with code and input properties', () => {
    const error = { code: 'ERR01', input: 'Invalid input' };
    expect(getErrorMessage(error)).toBe('ERR01: Invalid input');
  });

  it('should return the initial message for an object without a message, code, or input', () => {
    const error = { someOtherProp: 'value' };
    expect(getErrorMessage(error)).toBe('An error occurred');
  });

  it('should return the initial message for non-error and non-object types', () => {
    expect(getErrorMessage(null)).toBe('An error occurred');
    expect(getErrorMessage(undefined)).toBe('An error occurred');
    expect(getErrorMessage(123)).toBe('An error occurred');
    expect(getErrorMessage('string error')).toBe('An error occurred');
  });
});
