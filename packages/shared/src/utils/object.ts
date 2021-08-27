/**
 * Creates an object composed of the picked object properties.
 * @param obj The source object.
 * @param keys Properties to pick.
 */
export const pick = <Obj, Key extends keyof Obj>(obj: Obj, keys: Key[]) => {
  const ret = {} as Pick<Obj, Key>;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    ret[key] = obj[key];
  }

  return ret;
};

/**
 * Creates an object composed of properties of object that are not omitted.
 * @param obj The source object.
 * @param keys Properties to omit.
 */
export const omit = <Obj, Key extends keyof Obj>(obj: Obj, keys: Key[]) => {
  const ret = { ...obj };

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    delete ret[key];
  }

  return ret as Omit<Obj, Key>;
};
