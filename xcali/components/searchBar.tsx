import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { useSearch } from '@/hooks/usesearch'; // Adjust path as needed

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const { results, loading, error } = useSearch(query);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSelect = (id: string) => {
        router.push(`/user/${id}`);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for users or projects..."
                aria-label="Search"
                className="border rounded-lg text-black px-4 py-2 w-full"
            />
            <FaSearch className="absolute top-2 right-3 text-gray-500" size={20} aria-hidden="true" />
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {results.length > 0 && (
                <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {results.map((result) => (
                        <li
                            key={result.id}
                            onClick={() => handleSelect(result.id)}
                            className="cursor-pointer text-black px-4 py-2 hover:bg-gray-100"
                            role="option"
                            aria-selected="false"
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
