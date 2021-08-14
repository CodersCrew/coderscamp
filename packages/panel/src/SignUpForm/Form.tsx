import React, { useEffect, useState } from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';

import { StorageHelper } from './helpers/storageHelper';
import { FormStepOne, FormStepThree, FormStepTwo } from './Steps';

export const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    StorageHelper.getValue('formStepNumber').then((res) => {
      if (res) {
        setCurrentStep(JSON.parse(res));
      }
    });
  }, []);

  const formElements = [
    <FormStepOne setCurrentStep={setCurrentStep} currentStep={currentStep} key={0} />,
    <FormStepTwo setCurrentStep={setCurrentStep} currentStep={currentStep} key={1} />,
    <FormStepThree setCurrentStep={setCurrentStep} currentStep={currentStep} key={2} />,
  ];

  return (
    <Flex backgroundColor="gray.100">
      <Flex maxWidth="720px" margin="80px auto 192px auto" background="#fff">
        {formElements[currentStep]}
      </Flex>
    </Flex>
  );
};
