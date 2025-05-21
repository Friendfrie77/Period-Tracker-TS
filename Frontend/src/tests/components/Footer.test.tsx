import {render, screen} from '@testing-library/react';
import Footer from '../../components/layout/Footer';

test('renders Footer compenets, checking if footer has correct information in it', () =>{
    // const year = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /albert friend/i})).toBeInTheDocument();
    expect(screen.getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument();
});