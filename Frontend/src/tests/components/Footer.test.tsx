import { render } from '@testing-library/react';
import Footer from '../../components/layout/Footer';

describe('Footer', () => {
  it('renders the current year and author name', () => {
    const { getByText, getByRole } = render(<Footer />);
    
    // Check if the year is rendered
    const currentYear = new Date().getFullYear();
    expect(getByText(`© ${currentYear}`)).toBeInTheDocument();
    
    // Check if the author name is rendered
    const authorLink = getByRole('link', { name: /Albert Friend/i });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'albertfriend.dev');
    expect(authorLink).toHaveAttribute('target', '_blank');
  });
});