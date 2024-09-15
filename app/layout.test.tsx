import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should render without children', () => {
    const { container } = render(<RootLayout>{null}</RootLayout>);

    expect(container.firstChild).toBeNull();
  });
});
