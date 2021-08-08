import React from 'react';

import { GoToFormPage } from './GoToFormPage/GoToFormPage';
import { SignUpPageForCandidates } from './SignUpPageForCandidates/SignUpPageForCandidates';

export const App = () => {
  return (
    <>
      <SignUpPageForCandidates />
      <GoToFormPage />
    </>
  );
};
