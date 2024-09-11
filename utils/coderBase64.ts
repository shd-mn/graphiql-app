export function textToBase64(text: string) {
  return Buffer.from(text, 'utf-8').toString('base64');
}

export function base64ToText(text: string) {
  return Buffer.from(text, 'base64').toString('utf-8');
}
