import { screen } from '@testing-library/react';
import { customRender } from '@/__test__/test-utils';
import SignIn from './page';
import * as FormSignInComponent from '@/components/FormSignIn';

vi.mock('@/firebase', () => ({
  auth: {},
}));

vi.mock('@/components/FormSignIn');

describe('SignIn Page', () => {
  it('renders FormSignIn component', () => {
    vi.spyOn(FormSignInComponent, 'default').mockReturnValue(<div>Mocked FormSignIn</div>);

    customRender(<SignIn />);

    expect(screen.getByText('Mocked FormSignIn')).toBeInTheDocument();
  });
});
