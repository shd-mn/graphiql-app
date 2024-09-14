import { describe, expect, it } from 'vitest';
import { base64ToText, textToBase64 } from '@/utils/coderBase64';

describe('coderBase64', () => {
  it('should encode text to Base64', () => {
    const originalText = 'Hello, World!';
    const encodedText = textToBase64(originalText);

    expect(encodedText).toBe('SGVsbG8sIFdvcmxkIQ==');
  });

  it('should decode Base64 to text', () => {
    const encodedText = 'SGVsbG8sIFdvcmxkIQ==';
    const decodedText = base64ToText(encodedText);

    expect(decodedText).toBe('Hello, World!');
  });

  it('should handle empty string encoding and decoding', () => {
    const originalText = '';
    const encodedText = textToBase64(originalText);
    const decodedText = base64ToText(encodedText);

    expect(encodedText).toBe('');
    expect(decodedText).toBe('');
  });
});
