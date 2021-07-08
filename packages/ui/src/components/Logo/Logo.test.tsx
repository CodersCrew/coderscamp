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

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', whiteHorizontalLogo);
    expect(logo).toHaveAttribute('alt', 'Logo CodersCamp');
  });

  it('renders correctly square black version', () => {
    render(<Logo color="black" layout="square" />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', blackSquareLogo);
    expect(logo).toHaveAttribute('alt', 'Logo CodersCamp');
  });

  it('renders correctly square white version', () => {
    render(<Logo color="white" layout="square" />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', whiteSquareLogo);
    expect(logo).toHaveAttribute('alt', 'Logo CodersCamp');
  });

  it('renders correctly horizontal black version', () => {
    render(<Logo color="black" layout="horizontal" />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', blackHorizontalLogo);
    expect(logo).toHaveAttribute('alt', 'Logo CodersCamp');
  });

  it('renders correctly horizontal white version', () => {
    render(<Logo color="white" layout="horizontal" />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', whiteHorizontalLogo);
    expect(logo).toHaveAttribute('alt', 'Logo CodersCamp');
  });
});
