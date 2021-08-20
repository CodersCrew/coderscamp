import { Dispatch, SetStateAction } from 'react';

// TODO Extract more types

export type FormProps = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export type FormStepOneData = {
  fullName: string;
  email: string;
  town: string;
  birthYear: number;
  gender: string;
  educationStatus: string;
  fromWhere: string[];
  fromWhereSource?: string[];
  associatedWords: string;
};

export type FormStepTwoData = {
  description: string;
  prevParticipation: string;
  reasonForRetaikingCourse: string;
  expectations: string;
  experience?: string;
  reasonToAccept: string;
  plans: string;
  absencePeriod: string;
  averageTime: number;
};

export type FormStepThreeData = {
  regulationAccept: boolean;
  rodoAccept: boolean;
  marketingAccept: boolean;
};
