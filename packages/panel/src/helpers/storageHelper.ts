import { FormStepOneData, FormStepThreeData, FormStepTwoData } from '../types/formTypes';

export type StorageName = 'formStepOne' | 'formStepTwo' | 'formStepThree' | 'formStepNumber';

// TODO Improve and add interfaces

export class StorageHelper {
  static setValue(name: StorageName, value: FormStepOneData | FormStepThreeData | FormStepTwoData | number) {
    const parsedValue = JSON.stringify(value);

    localStorage.setItem(name, parsedValue);
  }

  static async getValue(name: StorageName) {
    try {
      return JSON.parse(localStorage.getItem(name) as string);
    } catch {
      return null;
    }
  }

  static async removeValue(name: StorageName) {
    localStorage.removeItem(name);
  }
}
