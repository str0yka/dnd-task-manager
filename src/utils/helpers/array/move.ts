export const move = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  if (
    fromIndex > array.length - 1 ||
    fromIndex < 0 ||
    toIndex > array.length - 1 ||
    toIndex < 0 ||
    fromIndex === toIndex
  ) {
    return array;
  }

  const deepCopiedArray = JSON.parse(JSON.stringify(array)) as T[];

  deepCopiedArray.splice(toIndex, 0, deepCopiedArray.splice(fromIndex, 1)[0]);

  return deepCopiedArray;
};
