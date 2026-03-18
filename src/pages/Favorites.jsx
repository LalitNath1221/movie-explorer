import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeFavorite } from "../store/authSlice";
import axiosInstance from "../api/api";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

// separate card component in same file
const FavoriteCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRemove = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await axiosInstance.delete(`/favorites/${movie.imdbId}`);
      dispatch(removeFavorite(movie.imdbId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbId}`)}
      className="bg-nf-card rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <img
        src={movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3">
        <h3 className="text-nf-text font-semibold text-sm truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-nf-muted text-xs">{movie.year}</span>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="disabled:opacity-50 transition-opacity cursor-pointer"
          >
            {loading
              ? <Loader2 size={20} className="animate-spin text-nf-red" />
              : <Heart size={20} className="fill-nf-red text-nf-red" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const { favorites } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nf-bg px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-nf-text text-2xl font-bold mb-6">My Favorites</h1>

        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart size={48} className="text-nf-muted mb-4" />
            <p className="text-nf-muted text-lg mb-6">No favorites yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-nf-red px-8 py-3 text-base font-semibold rounded text-white hover:opacity-90 transition-opacity"
            >
              Search Movies →
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <FavoriteCard key={movie.imdbId} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;