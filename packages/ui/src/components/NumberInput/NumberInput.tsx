import React from 'react'
import {NumberInput as ChakraNumberInput, NumberInputStepper, NumberIncrementStepper,   NumberDecrementStepper, forwardRef, HTMLChakraProps, UseNumberInputProps, NumberInputField} from '@chakra-ui/react'

type NumberInputSize = 'sm' | 'md' | 'lg';

type NumberInputMode = 'numeric' | 'decimal'

export interface NumberInputProps extends Omit<HTMLChakraProps<"div">, keyof UseNumberInputProps> {
	size: NumberInputSize,
	inputMode: NumberInputMode,
	disabled: boolean,
	value?: number,
	onChange?: (arg: string) => void,
	max?: number,
	min?: number,
	precision?: number, 
	step?: number,
}

export const lgStyleProps = {
	height: '48px',
	padding: '1px 0px 1px 16px'
  };
  
  export const mdStyleProps = {
	height: '40px',
	padding: '1px 0px 1px 16px'
  };

  export const smStyleProps = {
	height: '32px',
	padding: '1px 0px 1px 12px'
  };

export const NumberInput = forwardRef<NumberInputProps, 'input'>(({size, inputMode, disabled, 'aria-describedby': ariaDescribedby,'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, value, name, max, min, precision, onChange, step},  ref) => {

	const styleProps = {
		borderRadius: '6px',
		width: '200px'
	}

	const sizeProps = {
		sm: smStyleProps,
		md: mdStyleProps,
		lg: lgStyleProps,
	}
	
	const hoverStyleProps = {
		border: '1px solid #9CA3AF'
	}
	
	const focusStyleProps = {
		'box-shadow': '0px 0px 0px 3px rgba(56, 189, 248, 0.6)'
	}

	const invalidStyleProps = {
		border: '2px solid #EF4444',
	}

	return <ChakraNumberInput size={size} inputMode={inputMode} isDisabled={disabled} aria-describedby={ariaDescribedby} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} value={value} onChange={onChange} name={name} max={max} min={min} precision={precision} step={step} ref={ref} {...styleProps}>
			<NumberInputField _hover={hoverStyleProps} _focus={focusStyleProps} _invalid={invalidStyleProps} {...sizeProps[size]} {...styleProps}/>
			<NumberInputStepper >
				<NumberIncrementStepper />
				<NumberDecrementStepper />
			</NumberInputStepper>
	</ChakraNumberInput>
})
