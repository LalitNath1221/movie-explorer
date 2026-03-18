import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addFavorite, removeFavorite } from "../store/authSlice";
import axiosInstance from "../api/api";
import useFavorite from "../hooks/useFavorite";
import { useState } from "react";
import { Heart, Loader2 } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isFavorited, toggleFavorite } = useFavorite();

  const handleFavorite = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await toggleFavorite(movie);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate">
          {movie.Title}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400 text-xs">{movie.Year}</span>
          <button
            onClick={handleFavorite}
            disabled={loading}
            className="disabled:opacity-50 transition-opacity cursor-pointer"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin text-nf-red" />
            ) : (
              <Heart
                size={20}
                className={
                  isFavorited(movie.imdbID)
                    ? "fill-nf-red text-nf-red"
                    : "text-nf-muted hover:text-nf-red transition-colors"
                }
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
