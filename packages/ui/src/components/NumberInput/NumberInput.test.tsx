import React from 'react';
import { render, screen } from '@testing-library/react';

import { NumberInput, lgStyleProps, mdStyleProps, smStyleProps } from './NumberInput';

describe('NumberInput', () => {
	it('renders correctly in not disabled mode', () => {
	  render(<NumberInput size="lg" inputMode={'numeric'} disabled={false} aria-label={'inputNumber'}/>);
  
	  const numberInput = screen.getByLabelText('inputNumber');
  
	  expect(numberInput).not.toBeDisabled();
	  expect(numberInput).toBeInTheDocument();
	});
  
	it('renders correctly in disabled mode', () => {
		render(<NumberInput size="lg" inputMode={'numeric'} disabled={true} aria-label={'inputNumber'}/>);
  
		const numberInput = screen.getByLabelText('inputNumber');
	
		expect(numberInput).toBeDisabled();
		expect(numberInput).toBeInTheDocument();
	});

	it('renders correctly in large size', () => {
		render(<NumberInput size="lg" inputMode={'numeric'} disabled={true} aria-label={'inputNumber'}/>);
  
		const numberInput = screen.getByLabelText('inputNumber');
	
		expect(numberInput).toHaveStyle(lgStyleProps);
		expect(numberInput).toBeInTheDocument();
	});
	it('renders correctly in medium size', () => {
		render(<NumberInput size="md" inputMode={'numeric'} disabled={true} aria-label={'inputNumber'}/>);
  
		const numberInput = screen.getByLabelText('inputNumber');
	
		expect(numberInput).toHaveStyle(mdStyleProps);
		expect(numberInput).toBeInTheDocument();
	});
	it('renders correctly in small size', () => {
		render(<NumberInput size="sm" inputMode={'numeric'} disabled={true} aria-label={'inputNumber'}/>);
  
		const numberInput = screen.getByLabelText('inputNumber');
	
		expect(numberInput).toHaveStyle(smStyleProps);
		expect(numberInput).toBeInTheDocument();
	});
  });
