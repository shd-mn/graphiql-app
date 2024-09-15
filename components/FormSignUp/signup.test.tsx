import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import FormSignUp from '@/components/FormSignUp/index';
import { customRender } from '@/__test__/test-utils';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from '@firebase/auth';
import { auth, logout } from '@/firebase';
import { toast } from 'sonner';
import { FirebaseError } from '@firebase/util';

vi.mock('@/firebase', () => ({
  auth: {},
  logout: vi.fn(),
}));

vi.mock('@firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: {
      uid: 'user123',
      email: 'john@example.com',
      emailVerified: false,
    },
    providerId: 'firebase',
    operationType: 'signIn',
  }),
  sendEmailVerification: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    warning: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('FormSignUp', () => {
  beforeEach(() => {
    (logout as MockedFunction<typeof logout>).mockResolvedValue();
    (updateProfile as MockedFunction<typeof updateProfile>).mockResolvedValue();
    (sendEmailVerification as MockedFunction<typeof sendEmailVerification>).mockResolvedValue();
  });

  it('renders form elements correctly', () => {
    customRender(<FormSignUp />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should show validation errors if form is invalid', async () => {
    customRender(<FormSignUp />);

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    submitButton.click();

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes('Name') && content.includes('required')),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes('Email') && content.includes('required')),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes('Password') && content.includes('required')),
      ).toBeInTheDocument();
    });
  });

  it('submits the form and calls Firebase functions on success', async () => {
    const { user } = customRender(<FormSignUp />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    const passwordInput = screen.getByLabelText('Password', { selector: 'input' }) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm password') as HTMLInputElement;

    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');

    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });

    await user.click(screen.getByRole('button', { name: /sign up/i }));
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
      expect(screen.getByLabelText('Password', { selector: 'input' })).toHaveValue('Password123!');
      expect(screen.getByLabelText('Confirm password', { selector: 'input' })).toHaveValue('Password123!');
      expect(screen.getByRole('button', { name: /sign up/i }).innerText).toBe('Sign up');
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'john@example.com', 'Password123!');
      expect(logout).toHaveBeenCalled();
      expect(updateProfile).toHaveBeenCalledWith(expect.any(Object), { displayName: 'John Doe' });
      expect(sendEmailVerification).toHaveBeenCalled();
      expect(toast.warning).toHaveBeenCalledWith('Please confirm your email address');
    });
  });

  it('handles Firebase error on sign up', async () => {
    (createUserWithEmailAndPassword as MockedFunction<typeof createUserWithEmailAndPassword>).mockRejectedValueOnce(
      new FirebaseError('auth/email-already-in-use', 'Email already in use'),
    );

    const { user } = customRender(<FormSignUp />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText('Password', { selector: 'input' }), 'Password123!');
    await user.type(screen.getByLabelText('Confirm password'), 'Password123!');

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith('User already exists. Please sign in.');
    });
  });

  it('toggles password visibility', () => {
    customRender(<FormSignUp />);

    const passwordInput = screen.getByLabelText('Password', { selector: 'input' }) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm password', { selector: 'input' }) as HTMLInputElement;
    const togglePasswordVisibilityButton = screen.getAllByRole('button', { name: /toggle password visibility/i });

    expect(passwordInput.type).toBe('password');
    expect(confirmPasswordInput.type).toBe('password');

    fireEvent.click(togglePasswordVisibilityButton[0]);
    expect(passwordInput.type).toBe('text');
    expect(confirmPasswordInput.type).toBe('text');

    fireEvent.click(togglePasswordVisibilityButton[0]);
    expect(passwordInput.type).toBe('password');
    expect(confirmPasswordInput.type).toBe('password');
  });

  it('prevents default behavior on password visibility toggle button mouse down', () => {
    customRender(<FormSignUp />);

    const togglePasswordVisibilityButton = screen.getAllByRole('button', { name: /toggle password visibility/i })[0];

    const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault');

    fireEvent.mouseDown(togglePasswordVisibilityButton);

    expect(preventDefaultSpy).toHaveBeenCalled();

    preventDefaultSpy.mockRestore();
  });
});
