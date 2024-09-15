import { screen } from '@testing-library/react';
import { customRender } from '@/__test__/test-utils';
import RestForm from '@/components/RestClient/index';

describe('RestForm Component', () => {
  it('renders form correctly', () => {
    customRender(<RestForm />);

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument();
  });

  it('handles locale changes correctly', () => {
    customRender(<RestForm />, { locale: 'ru' });

    expect(screen.getByRole('button', { name: /отправить/i })).toBeInTheDocument();
  });
});
