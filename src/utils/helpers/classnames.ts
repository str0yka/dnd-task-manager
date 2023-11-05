type ClassNamesParams = Array<Record<string, unknown> | string | boolean | undefined | null>;

export const cn = (...classNames: ClassNamesParams) => {
  const result = [] as string[];

  for (let i = 0; i < classNames.length; i++) {
    const currentItem = classNames[i];
    const isObject =
      typeof currentItem === 'object' && !Array.isArray(currentItem) && currentItem !== null;

    console.log(currentItem);

    if (isObject) {
      Object.keys(currentItem).forEach((className) => {
        const currentClassName = currentItem[className];

        if (!!currentClassName && typeof className === 'string') {
          result.push(className);
        }
      });
    }

    if (!!currentItem && typeof currentItem === 'string') {
      result.push(currentItem);
    }
  }

  return result.join(' ');
};
