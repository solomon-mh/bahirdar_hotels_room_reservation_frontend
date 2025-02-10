import { useSearchParams } from "react-router-dom";
import { cn } from "../utils/cn";
import { useEffect, useState } from "react";

interface SearchProps {
  className?: string;

}
function Search({ className = "" }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearch)
    {
      searchParams.set("search", debouncedSearch);
      setSearchParams(searchParams);
    }
    else
    {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);
  return (
    <form
      className={cn(
        "group relative flex flex-1 items-center justify-center",
        className,
      )}
    >
      <div className="flex flex-row w-full rounded-full shadow-gray-400 shadow-lg">
        <input
          type="search"
          autoFocus
          className="rounded-full w-full md:w-[18rem] bg-slate-100 px-6 text-slate-900 py-2 focus:outline-none disabled:cursor-not-allowed"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </form>
  );
}

export default Search;
