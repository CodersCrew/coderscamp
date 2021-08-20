import { FieldValues, UseFormSetValue } from 'react-hook-form';

import { StorageHelper, StorageName } from './storageHelper';

export const setFormValues = async (formStep: StorageName, setCallback: UseFormSetValue<FieldValues>) => {
  const res = await StorageHelper.getValue(formStep);

  Object.keys(res).forEach((key: any) => {
    setCallback(key, res[key]);
  });
};
