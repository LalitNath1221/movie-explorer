import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import axiosInstance from '../api/api';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY;


const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    if (!query.trim()) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      setResults([]);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${currentPage}&apikey=${OMDB_KEY}`
        );
        const data = await res.json();
        if (data.Response === 'True') {
          setResults(data?.Search || []);
          setTotalResults(parseInt(data.totalResults) || 0);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ q: query, page });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-nf-bg px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Search bar at top of results page */}
        <div className="mb-8">
          <SearchBar initialQuery={query} />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-nf-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center py-10 text-nf-red">{error}</p>
        )}

        {!loading && !error && results.length === 0 && query && (
          <div className="flex flex-col items-center justify-center py-20 text-nf-muted">
            <span className="text-5xl mb-4">🎬</span>
            <p className="text-lg">No movies found for "{query}"</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="text-nf-muted text-sm mb-4">
              {totalResults} results for "{query}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default Search;