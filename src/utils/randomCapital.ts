import { capitals } from "../data/capitals";

export const randomCapital = () => {
  return capitals[Math.floor(Math.random() * capitals.length)];
};
