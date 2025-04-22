import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';

interface Props {
  onSubmit: (query: string) => void;
}

const SearchInput = ({ onSubmit }: Props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mr-2">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default React.memo(SearchInput);
