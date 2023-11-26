export const joinObject = (obj: object, delimiter = ", ") => {
  return Object.values(obj)
    .filter((val) => val !== "")
    .join(delimiter);
};
