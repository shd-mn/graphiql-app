import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import '@testing-library/jest-dom';
import RESTful from '@/app/[locale]/[...rest]/page';

vi.mock('@/components/RestClient', () => ({
  __esModule: true,
  default: () => <div>RestForm Mock</div>,
}));

vi.mock('@/components/Response', () => ({
  __esModule: true,
  default: () => <div>ResponseSection Mock</div>,
}));

describe('RESTful Component', () => {
  it('renders correctly', () => {
    render(<RESTful />);

    expect(screen.getByText('RestForm Mock')).toBeInTheDocument();
    expect(screen.getByText('ResponseSection Mock')).toBeInTheDocument();
  });
});
