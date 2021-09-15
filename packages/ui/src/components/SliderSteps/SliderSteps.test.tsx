import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withExpectedError } from '../../testHelpers';
import { SliderSteps, SliderStepsProps } from './SliderSteps';

const clickForwardArrow = () => {
  userEvent.click(screen.getByLabelText('Następny'));
};

const clickBackArrow = () => {
  userEvent.click(screen.getByLabelText('Poprzedni'));
};

const getAllDots = () => screen.getAllByRole('tab');

const renderSliderSteps = (props: Partial<SliderStepsProps>) =>
  render(<SliderSteps count={5} selectedIndex={1} onChange={jest.fn()} {...props} />);

describe('SliderSteps', () => {
  it('renders given number of steps', () => {
    const count = 3;

    renderSliderSteps({ count });

    expect(getAllDots()).toHaveLength(count);
  });

  it('has selected index on a given position', () => {
    const selectedIndex = 2;

    renderSliderSteps({ selectedIndex });

    const selectedDotIndex = getAllDots().findIndex((dot) => dot.getAttribute('aria-selected') === 'true');

    expect(selectedDotIndex).toEqual(selectedIndex);
  });

  it('calls `onChange` with the dot index when user clicks any non-selected dot', () => {
    const selectedIndex = 2;
    const indexToClick = selectedIndex + 2;
    const onChange = jest.fn();

    renderSliderSteps({ selectedIndex, onChange });

    userEvent.click(getAllDots()[indexToClick]);

    expect(onChange).toHaveBeenCalledWith(indexToClick);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("doesn't call `onChange` when user clicks the currently selected dot", () => {
    const selectedIndex = 2;
    const onChange = jest.fn();

    renderSliderSteps({ selectedIndex });

    userEvent.click(getAllDots()[selectedIndex]);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls `onChange` with value of the index incremented by one when user clicks the forward button', () => {
    const selectedIndex = 1;
    const onChange = jest.fn();

    renderSliderSteps({ selectedIndex, onChange });

    clickForwardArrow();

    expect(onChange).toHaveBeenCalledWith(selectedIndex + 1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls `onChange` with value of the index decremented by one when user clicks the back button', () => {
    const selectedIndex = 1;
    const onChange = jest.fn();

    renderSliderSteps({ selectedIndex, onChange });

    clickBackArrow();

    expect(onChange).toHaveBeenCalledWith(selectedIndex - 1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls `onChange` with the first index when user clicks the forward button and `selectedIndex` is the last step', () => {
    const count = 3;
    const firstIndex = 0;
    const lastIndex = count - 1;
    const onChange = jest.fn();

    renderSliderSteps({ count, selectedIndex: lastIndex, onChange });

    clickForwardArrow();

    expect(onChange).toHaveBeenCalledWith(firstIndex);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls `onChange` with the last index when user clicks the back button and `selectedIndex` is the first step', () => {
    const count = 3;
    const firstIndex = 0;
    const lastIndex = count - 1;
    const onChange = jest.fn();

    renderSliderSteps({ count, selectedIndex: firstIndex, onChange });

    clickBackArrow();

    expect(onChange).toHaveBeenCalledWith(lastIndex);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('displays step number instead of dots when `showDots` prop is `false`', () => {
    const count = 3;
    const selectedIndex = 1;

    renderSliderSteps({ count, selectedIndex, showDots: false });

    expect(screen.getByText(`${selectedIndex + 1} / ${count}`)).toBeInTheDocument();
  });

  it('throws when component receives `selectedIndex` grater than the number of rendered dots', () => {
    expect(withExpectedError(() => renderSliderSteps({ count: 3, selectedIndex: 4 }))).toThrow();
  });

  it('throws when component receives `selectedIndex` as a negative number', () => {
    expect(withExpectedError(() => renderSliderSteps({ selectedIndex: -1 }))).toThrow();
  });
});
