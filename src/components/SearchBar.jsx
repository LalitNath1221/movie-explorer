import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY;

const SearchBar = ({ initialQuery = "" }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  const isTyping = useRef(false);

  useEffect(() => {
    setQuery(initialQuery);
    isTyping.current = false;
    setSuggestions([]);
    setShowSuggestions(false);
  }, [initialQuery]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${OMDB_KEY}`,
        );
        const data = await res.json();
        if (data.Response === "True") {
          setSuggestions(data.Search.slice(0, 5));
          if(isTyping.current){
            setShowSuggestions(true);
          }
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (err) {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(query)}&page=1`);
  };

  const handleSuggestionClick = (title) => {
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(title)}&page=1`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search movies, e.g. Inception..."
            value={query}
            onChange={(e) => {
              isTyping.current = true;
              setQuery(e.target.value);
            }}
            onFocus={() => {
              if (isTyping.current && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              isTyping.current = false;
            }}
            className="w-full bg-nf-input text-nf-text px-4 py-3 rounded outline-none border border-nf-border focus:border-nf-red transition-colors placeholder:text-nf-muted"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded overflow-hidden border border-nf-border bg-nf-card">
              {suggestions.map((movie) => (
                <div
                  key={"s" + movie.imdbID}
                  onClick={() => handleSuggestionClick(movie.Title)}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-nf-input transition-colors border-b border-nf-border last:border-b-0"
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/32x48?text=?"
                    }
                    alt={movie.Title}
                    className="w-8 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-nf-text text-sm font-medium">
                      {movie.Title}
                    </p>
                    <p className="text-nf-muted text-xs">{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-nf-red text-white font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
