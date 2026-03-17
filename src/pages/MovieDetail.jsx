import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/authSlice";
import axiosInstance from "../api/api";
import useFavorite from "../hooks/useFavorite";

const MovieDetail = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFavorited, toggleFavorite } = useFavorite();
    const [loadingFav, setLoadingFav] = useState(false);


  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${import.meta.env.VITE_OMDB_API_KEY}`,
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [imdbId]);

  const handleFavorite = async () => {
    setLoadingFav(true);
    try {
      await toggleFavorite(movie);
    } finally {
      setLoadingFav(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-nf-bg px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:underline mb-6 block cursor-pointer"
        >
          ← Back
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="w-64 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-2">
              {movie.Title}
            </h1>
            <p className="text-gray-400 mb-1">
              {movie.Year} • {movie.Genre}
            </p>
            <p className="text-gray-400 mb-1">⭐ {movie.imdbRating}</p>
            <p className="text-gray-400 mb-1">
              <span className="text-white">Actors:</span> {movie.Actors}
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">{movie.Plot}</p>
            <button
              onClick={handleFavorite}
              disabled={loadingFav}
              className={`cursor-pointer mt-6 px-6 py-2 rounded font-bold ${isFavorited ? "bg-red-600 hover:bg-red-700" : "bg-yellow-400 hover:bg-yellow-500 text-black"}`}
            >
              {loadingFav
                ? "Updating..."
                : isFavorited(movie.imdbID)
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
