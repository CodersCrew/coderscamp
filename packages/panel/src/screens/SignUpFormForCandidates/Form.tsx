import React, { useEffect, useState } from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';

import { FormStepOne, FormStepThree, FormStepTwo } from '../../components/FormElements/Steps';
import { StorageHelper } from '../../helpers/storageHelper';

export const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    StorageHelper.getValue('formStepNumber').then((res) => {
      if (res) {
        setCurrentStep(JSON.parse(res));
      }
    });
  }, []);

  const formElements = {
    0: <FormStepOne setCurrentStep={setCurrentStep} key={0} />,
    1: <FormStepTwo setCurrentStep={setCurrentStep} key={1} />,
    2: <FormStepThree setCurrentStep={setCurrentStep} key={2} />,
  };

  return (
    <Flex backgroundColor="gray.100">
      <Flex maxWidth="720px" margin="80px auto 192px auto" background="#fff">
        {formElements[currentStep as keyof typeof formElements]}
      </Flex>
    </Flex>
  );
};
