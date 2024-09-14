import { render, screen } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useAuthState } from 'react-firebase-hooks/auth';
import PrivateRoute from '@/components/PrivateRoute/index';

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/some-path',
  }),
  usePathname: () => '/some-path',
}));

vi.mock('@/firebase', () => ({
  auth: {},
  logout: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('PrivateRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders <Elipsis /> when loading', () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([null, true, undefined]);

    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
