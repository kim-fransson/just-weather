import { SearchField } from "./components/Search";

export default function App() {
  return (
    <div className="mt-20 p-10">
      <SearchField aria-label="test" placeholder="Search for cities" />
    </div>
  );
}
