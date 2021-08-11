import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SliderSteps } from './SliderSteps';

describe('SliderSteps', () => {
  const givenStepsCount = 5;
  const lastDotIndex = givenStepsCount - 1;
  const selectedIndex = 2;
  let selectedIndexAfterClick: number | undefined;

  const RenderSliderComponentAtPosition = (selectedDotIndex: number) =>
    render(
      <SliderSteps
        count={givenStepsCount}
        selectedIndex={selectedDotIndex}
        onChange={(newIndex) => {
          selectedIndexAfterClick = newIndex;
        }}
      />,
    );

  const getSelectedDotIndex = () =>
    screen.getAllByRole('tab').findIndex((x) => x.getAttribute('aria-selected') === 'true');

  const fireButtonClick = (buttonLabel: 'go forward button' | 'go back button') => {
    const button = screen.getByLabelText(buttonLabel);

    userEvent.click(button);
  };

  beforeEach(() => {
    selectedIndexAfterClick = undefined;
  });

  it('renders given number of steps correctly with one selected step', () => {
    RenderSliderComponentAtPosition(selectedIndex);

    expect(screen.getAllByRole('tab')).toHaveLength(givenStepsCount);
    expect(screen.getAllByRole('tab', { selected: true }).length).toEqual(1);
  });

  it('has selected index on given position', () => {
    RenderSliderComponentAtPosition(selectedIndex);

    expect(getSelectedDotIndex()).toEqual(selectedIndex);
  });

  it('should increase by one current dot after click forward button', () => {
    RenderSliderComponentAtPosition(selectedIndex);

    fireButtonClick('go forward button');

    expect(selectedIndexAfterClick).toEqual(selectedIndex + 1);
  });

  it('should decrease by one current dot after click back button', () => {
    RenderSliderComponentAtPosition(selectedIndex);

    fireButtonClick('go back button');

    expect(selectedIndexAfterClick).toEqual(selectedIndex - 1);
  });

  it('should select first dot after click forward button when last dot is selected', () => {
    RenderSliderComponentAtPosition(lastDotIndex);

    fireButtonClick('go forward button');

    expect(selectedIndexAfterClick).toEqual(0);
  });

  it('should select last dot after click back button when first dot is selected', () => {
    RenderSliderComponentAtPosition(0);

    fireButtonClick('go back button');

    expect(selectedIndexAfterClick).toEqual(lastDotIndex);
  });

  it('throws exception if component pass selectedIndex as negative number or grater than rendered dots', () => {
    // eslint-disable-next-line no-console
    const err = console.error;

    // eslint-disable-next-line no-console
    console.error = jest.fn();

    expect(() => RenderSliderComponentAtPosition(-1)).toThrow();

    expect(() => RenderSliderComponentAtPosition(givenStepsCount + 1)).toThrow();

    // eslint-disable-next-line no-console
    console.error = err;
  });
});
