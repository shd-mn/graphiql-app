import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphQL from '../../../../app/[locale]/GRAPHQL/[[...endpoint]]/page';
import { base64ToText } from '../../../../utils/coderBase64';
import '@testing-library/jest-dom';

vi.mock('@/components/GraphiQLClient', () => ({
  __esModule: true,
  default: () => <div>GraphiQLClient Mock</div>,
}));

vi.mock('@/components/Response', () => ({
  __esModule: true,
  default: () => <div>ResponseSection Mock</div>,
}));

vi.mock('@/utils/coderBase64', () => ({
  base64ToText: vi.fn((input) => input),
}));

describe('GraphQL Component', () => {
  it('renders correctly with params and searchParams', () => {
    const endpoint = ['aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=', 'c2VhcmNoIHRlc3Q='];

    render(<GraphQL params={{ endpoint }} searchParams={{ key: 'value' }} />);

    expect(screen.getByText('GraphiQLClient Mock')).toBeInTheDocument();
    expect(screen.getByText('ResponseSection Mock')).toBeInTheDocument();

    expect(base64ToText).toHaveBeenCalledWith('aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=');
    expect(base64ToText).toHaveBeenCalledWith('c2VhcmNoIHRlc3Q=');
  });

  it('handles missing params and searchParams gracefully', () => {
    render(<GraphQL />);

    expect(screen.getByText('GraphiQLClient Mock')).toBeInTheDocument();
    expect(screen.getByText('ResponseSection Mock')).toBeInTheDocument();
  });
});
