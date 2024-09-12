import { render, screen } from '@testing-library/react';
import Ellipsis from './Ellipsis';

describe('Ellipsis Component', () => {
  it('renders the loading svg', () => {
    render(<Ellipsis />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    const img = screen.getByAltText('loader');
    expect(img).toBeInTheDocument();

    screen.debug();
  });
});
