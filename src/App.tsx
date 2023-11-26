import { useState } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { joinObject } from "./utils";
import { Item } from "react-stately";
import { useSearch } from "./hooks";
import { useDebounce } from "@uidotdev/usehooks";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { isLoading, locations } = useSearch(debouncedSearchTerm);
  return (
    <main className="mx-auto h-screen border px-10 pb-12 pt-8 lg:px-60">
      <header className="flex items-center gap-10">
        <Logo className="shrink-0" />
        <Autocomplete
          items={locations}
          inputValue={searchTerm}
          onInputChange={setSearchTerm}
          isLoading={isLoading}
          aria-label="Search location for weather forecast"
          placeholder="Search for cities"
        >
          {(item) => (
            <Item key={item.name + "-" + item.region + "-" + item.country}>
              {joinObject(item)}
            </Item>
          )}
        </Autocomplete>
      </header>
    </main>
  );
}
