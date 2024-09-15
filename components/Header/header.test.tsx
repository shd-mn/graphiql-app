import { screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '@/components/Header';
import { MockedFunction, vi } from 'vitest';
import { customRender } from '@/__test__/test-utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';

vi.mock('../UI/LanguageSwitcher', () => ({
  default: vi.fn(() => <div>Mocked Language Switcher</div>),
}));

vi.mock('next-intl', async () => {
  const original = await vi.importActual<typeof import('next-intl')>('next-intl');
  return {
    ...original,
    useTranslations: vi.fn().mockReturnValue(vi.fn((key) => key)),
  };
});

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: vi.fn().mockReturnValue('/'),
  routing: vi.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/firebase', () => {
  const original = vi.importActual<typeof import('@/firebase')>('@/firebase');
  return {
    ...original,
    auth: {},
    logout: vi.fn().mockResolvedValue({}),
  };
});

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: {
      getIdTokenResult: vi.fn(() =>
        Promise.resolve({
          authTime: '2023-01-01T00:00:00Z',
          issuedAtTime: '2023-01-01T00:00:00Z',
          expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
        }),
      ),
    },
    onIdTokenChanged: vi.fn((callback) => {
      callback({
        getIdTokenResult: vi.fn(() =>
          Promise.resolve({
            authTime: '2023-01-01T00:00:00Z',
            issuedAtTime: '2023-01-01T00:00:00Z',
            expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
          }),
        ),
      });
    }),
  })),
  signOut: vi.fn(() => Promise.resolve()),
}));

vi.mock('sonner', () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe('Header Component', () => {
  beforeEach(() => {});

  it('renders sign in and sign up links when user is not authenticated', () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValueOnce([null, false, undefined]);

    customRender(<Header />);

    expect(screen.getByText('signIn')).toBeInTheDocument();
    expect(screen.getByText('signUp')).toBeInTheDocument();
  });

  it('renders sign out button when user is authenticated', () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([
      { uid: 'user123' } as User,
      false,
      undefined,
    ]);

    customRender(<Header />, {
      locale: 'en',
      messages: {
        Header: {
          home: 'Home',
          signIn: 'Sign In',
          signUp: 'Sign Up',
          signOut: 'Sign Out',
        },
      },
    });
  });

  waitFor(() => {
    expect(screen.getByText('signOut')).toBeInTheDocument();
    const button = screen.getByText('signOut');

    fireEvent.click(button);
  });
});
