import { Dispatch, SetStateAction } from 'react';

export type FormProps = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
};
