import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Component', () => {
  it('should render the Home component', () => {
    render(<Home />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent('Home');
  });
});
