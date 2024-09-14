import { describe, expect, it } from 'vitest';
import { a11yProps } from '@/utils/a11yProps';

describe('a11yProps', () => {
  it('should return correct accessibility attributes', () => {
    const index = 1;
    const result = a11yProps(index);

    expect(result).toEqual({
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    });
  });
});
