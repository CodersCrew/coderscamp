const createPlurals = (key0: string, key1: string, key2: string) => (count: number) => {
  if (count === 1) {
    return key0;
  }

  if (count < 5 || count > 21) {
    return key1;
  }

  return key2;
};

export const modulePlurals = createPlurals('moduł', 'moduły', 'modułów');
