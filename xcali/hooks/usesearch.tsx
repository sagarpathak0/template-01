import { useState, useEffect } from "react";
import axios from "axios";
import api from "@/api/api";

interface SearchResult {
  id: string;
  name: string;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length > 1) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const response = await api.get("http://localhost:8080/api/search", {
            params: { query },
          });
          setResults(response.data.suggestions);
        } catch (error) {
          setError("Failed to fetch results");
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return { results, loading, error };
};
