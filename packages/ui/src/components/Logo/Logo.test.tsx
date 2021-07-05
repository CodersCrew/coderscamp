import React from 'react';
import { render, screen } from '@testing-library/react';

import blackHorizontalLogo from '../../../images/LogoBlackHorizontal.svg';
import blackSquareLogo from '../../../images/LogoBlackSquare.svg';
import whiteHorizontalLogo from '../../../images/LogoWhiteHorizontal.svg';
import whiteSquareLogo from '../../../images/LogoWhiteSquare.svg';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders default', () => {
    render(<Logo />);

    const logo = screen.getByAltText('Logo CodersCamp');

    expect(logo.src).toContain(whiteHorizontalLogo);
    expect(logo).toBeInTheDocument();
  });

  it('renders correctly square black version', () => {
    render(<Logo color="black" layout="square" />);

    const logo = screen.getByAltText('Logo CodersCamp');

    expect(logo.src).toContain(blackSquareLogo);
  });

  it('renders correctly square white version', () => {
    render(<Logo color="white" layout="square" />);

    const logo = screen.getByAltText('Logo CodersCamp');

    expect(logo.src).toContain(whiteSquareLogo);
  });

  it('renders correctly horizontal black version', () => {
    render(<Logo color="black" layout="horizontal" />);

    const logo = screen.getByAltText('Logo CodersCamp');

    expect(logo.src).toContain(blackHorizontalLogo);
  });

  it('renders correctly horizontal white version', () => {
    render(<Logo color="white" layout="horizontal" />);

    const logo = screen.getByAltText('Logo CodersCamp');

    expect(logo.src).toContain(whiteHorizontalLogo);
  });
});
