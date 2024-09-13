import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { IdTokenResult, signInWithEmailAndPassword } from '@firebase/auth';
import FormSignIn from '@/components/FormSignIn';
import { customRender } from '@/__test__/test-utils';
import { ReactNode } from 'react';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
  }),
}));

vi.mock('@firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock('@/firebase', () => ({
  auth: {},
  logout: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('FormSignIn', () => {
  beforeEach(() => {
    (signInWithEmailAndPassword as MockedFunction<typeof signInWithEmailAndPassword>).mockResolvedValue({
      user: {
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        getIdToken: function (): Promise<string> {
          throw new Error('Function not implemented.');
        },
        getIdTokenResult: function (): Promise<IdTokenResult> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: '',
        uid: '',
      },
      providerId: 'firebase',
      operationType: 'signIn',
    });
  });

  it('renders the form correctly', () => {
    customRender(<FormSignIn />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    customRender(<FormSignIn />);

    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input' }) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('shows validation errors when form is submitted with empty fields', async () => {
    customRender(<FormSignIn />);

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation errors when form is submitted with invalid email', async () => {
    customRender(<FormSignIn />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input' }) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });
});
