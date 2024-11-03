import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = () => {
  return (
    <div className="flex items-center justify-center w-5/12 p-4">
      <div className="relative flex w-full max-w-md rounded-full shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-1 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
        <button className="px-4 py-2 bg-white rounded-r-full  text-purple-700 hover:bg-purple-700 hover:text-white focus:outline-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
