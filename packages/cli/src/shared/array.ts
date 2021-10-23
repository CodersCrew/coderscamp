export const asyncFilter = async <Item>(
  arr: Item[],
  predicate: (item: Item, index: number, arr: Item[]) => Promise<boolean>,
) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_value, i) => results[i]);
};

export const removeDuplicatesForProperty = <Item>(arr: Item[], property: keyof Item) =>
  arr.filter((value, i, array) => array.findIndex((t) => t[property] === value[property]) === i);
