import { PropsWithChildren } from "react";

export const Grid = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};
