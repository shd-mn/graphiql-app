import { customRender } from '@/__test__/test-utils';
import { screen } from '@testing-library/dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import Home from './page';

vi.mock('@/firebase', () => ({
  auth: {},
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('Home', () => {
  it('renders welcome message for unauthenticated user', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    customRender(<Home />);

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders welcome back message for authenticated user', () => {
    const mockUser = {
      displayName: 'Test User',
      uid: '123',
      email: 'test@example.com',
      emailVerified: true,
    } as User;

    vi.mocked(useAuthState).mockReturnValue([mockUser, false, undefined]);

    customRender(<Home />);

    expect(screen.getByText('Welcome Back, Test User!')).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});
