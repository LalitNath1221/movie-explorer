import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeFavorite } from '../store/authSlice';
import axiosInstance from '../api/api';

const Favorites = () => {
  const { favorites } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = async (e, imdbId) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/favorites/${imdbId}`);
      dispatch(removeFavorite(imdbId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6">My Favorites</h1>
        {favorites.length === 0 && (
          <p className="text-gray-400 text-center mt-12">No favorites yet. Go search for movies!</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map(movie => (
            <div
              key={movie.imdbId}
              onClick={() => navigate(`/movie/${movie.imdbId}`)}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img
                src={movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400 text-xs">{movie.year}</span>
                  <button
                    onClick={(e) => handleRemove(e, movie.imdbId)}
                    className="text-xl"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;