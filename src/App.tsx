import { SearchField } from "./components/SearchField";
import Logo from "./assets/icons/logo.svg?react";

export default function App() {
  return (
    <main className="max-w-[1440px mx-auto h-screen pb-12 pt-8">
      <header className="flex items-center gap-10">
        <div>
          <Logo />
        </div>
        <SearchField placeholder="Search for cities" />
      </header>
    </main>
  );
}
