import { screen } from '@testing-library/react';
import { customRender } from '@/__test__/test-utils';
import * as FormSignUpComponent from '@/components/FormSignUp';
import SignUp from './page';

vi.mock('@/firebase', () => ({
  auth: {},
}));

vi.mock('@/components/FormSignIn');

describe('SignUp Page', () => {
  it('renders FormSignUp component', () => {
    vi.spyOn(FormSignUpComponent, 'default').mockReturnValue(<div>Mocked FormSignUp</div>);

    customRender(<SignUp />);

    expect(screen.getByText('Mocked FormSignUp')).toBeInTheDocument();
  });
});
