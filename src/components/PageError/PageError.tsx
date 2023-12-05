import { Button } from "../Button";

import SadCloud from "../../assets/icons/cloud-error-illustration.svg?react";

export const PageError = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <SadCloud />
      <h2 className="text-gray-900 headline-lg">Oh no!</h2>
      <p className="font-bold uppercase text-gray-900 body-3">
        something went wrong
      </p>
      <Button
        onPress={() => window.location.reload()}
        className="select-none rounded-full bg-indigo-300 px-3 py-1 text-gray-100 outline-none transition-colors duration-150 ease-in-out body-2 hover:bg-indigo-500 focus-visible:bg-indigo-500"
      >
        Refresh page
      </Button>
    </div>
  );
};
