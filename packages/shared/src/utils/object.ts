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
