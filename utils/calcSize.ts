import prettyBytes from 'pretty-bytes';

export const calcSize = (...values: string[]) => {
  const bytes = values.reduce((acc, cur) => acc + cur.length, 0);
  return prettyBytes(bytes);
};
