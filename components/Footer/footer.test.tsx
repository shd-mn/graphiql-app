import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/Footer/index';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('should render the footer with correct links and content', () => {
    render(<Footer />);

    expect(screen.getByText('Shadman')).toBeInTheDocument();
    expect(screen.getByText('Alizada')).toBeInTheDocument();
    expect(screen.getByText('Volha')).toBeInTheDocument();
    expect(screen.getByText('Melayok')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();

    expect(screen.getByText('RS School')).toBeInTheDocument();
    expect(screen.getByAltText('The Rolling Scopes School')).toBeInTheDocument();
  });
});
