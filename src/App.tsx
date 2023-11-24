import { useSearch } from "./hooks";

export default function App() {
  const { locations, isError, isLoading } = useSearch("malm");
  console.log(locations);
  if (isLoading) {
    return "Loading...";
  }
  if (isError) {
    return "Error!!!";
  }

  return locations.map((location) => location.name + " ");
}
