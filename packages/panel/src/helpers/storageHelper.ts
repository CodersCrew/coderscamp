type StorageName = 'formStepOne' | 'formStepTwo' | 'formStepThree' | 'formStepNumber';

// TODO Improve and add interfaces

export class StorageHelper {
  static setValue(name: StorageName, value: any) {
    localStorage.setItem(name, value);
  }

  static async getValue(name: StorageName) {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  }

  static async removeValue(name: StorageName) {
    localStorage.removeItem(name);
  }
}
