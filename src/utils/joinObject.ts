export const joinObject = (
  obj: Record<string, unknown>,
  keys: string[] = [],
  delimiter = ", ",
) => {
  const objKeys = keys.length > 0 ? keys : Object.keys(obj);

  return objKeys
    .filter((key) => obj[key] !== "")
    .map((key) => obj[key])
    .join(delimiter);
};
