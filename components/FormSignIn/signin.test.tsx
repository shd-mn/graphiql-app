import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import FormSignIn from '@/components/FormSignIn';
import { customRender } from '@/__test__/test-utils';
import { ReactNode } from 'react';
import { logout } from '@/firebase';
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from '@firebase/auth';

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
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: {
      uid: 'user123',
      email: 'john@example.com',
      emailVerified: false,
      displayName: null,
    },
    providerId: 'firebase',
    operationType: 'signIn',
  }),
}));

vi.mock('@/firebase', () => ({
  auth: {},
  logout: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe('FormSignIn', () => {
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

  it('submits the form and calls Firebase functions on success', async () => {
    const { user } = customRender(<FormSignIn />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' }) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    await user.click(screen.getByRole('button', { name: /sign in/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(logout).toHaveBeenCalled();
      expect(toast.info).toHaveBeenCalledWith('Please confirm your email address');
    });
  });

  it('submits the form and calls Firebase functions on error', async () => {
    const { user } = customRender(<FormSignIn />);
    (signInWithEmailAndPassword as MockedFunction<typeof signInWithEmailAndPassword>).mockRejectedValue({
      code: 'auth/email-already-in-use',
    });

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' }) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    await user.click(screen.getByRole('button', { name: /sign in/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Failed to sign in. Please try' + ' again.');
    });
  });

  it('prevents default behavior on password visibility toggle button mouse down', () => {
    customRender(<FormSignIn />);

    const togglePasswordVisibilityButton = screen.getAllByRole('button', { name: /toggle password visibility/i })[0];

    const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault');

    fireEvent.mouseDown(togglePasswordVisibilityButton);

    expect(preventDefaultSpy).toHaveBeenCalled();

    preventDefaultSpy.mockRestore();
  });
});
