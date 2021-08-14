import { Dispatch, SetStateAction } from 'react';

// TODO Extract more types

export type FormProps = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
};
