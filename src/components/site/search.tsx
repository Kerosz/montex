// packages
import { SearchIcon } from "@heroicons/react/outline";

export default function Search() {
  return (
    <div className="flex-grow md:mr-8 sm:mr-5 mr-2.5 mb-1">
      <label htmlFor="search_bar" className="sr-only">
        Search
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3.5 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
          <SearchIcon className="w-5" />
        </span>
        <input
          type="text"
          name="search_bar"
          id="search_bar"
          className="focus:ring-0 focus:border-black-normal flex-1 block w-full rounded-none rounded-r-md border-gray-300"
          placeholder="Search site"
        />
      </div>
    </div>
  );
}
