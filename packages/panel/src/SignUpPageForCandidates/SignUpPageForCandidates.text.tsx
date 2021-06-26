import React from 'react';
import { getByAltText, render, screen } from '@testing-library/react';
import SignUpPageForCandidates from './SignUpPageForCandidates';

describe('Test for SignupPage Component', () => {
  it('should test is component render properly', () => {
    render(<SignUpPageForCandidates />);
    const text = screen.getByText(/Podczas CodersCamp będzie Ci potrzebne konto na portalu GitHub/);
    const logo = screen.getByAltText(/Logo CodersCamp/);
    [text, logo].map((test) => expect(test).toBeInTheDocument());
  });
});
