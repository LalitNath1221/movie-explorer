import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, openLoginModal } from '../store/authSlice';
import axiosInstance from '../api/api';

const useFavorite = () => {
  const dispatch = useDispatch();
  const { user, favorites } = useSelector(state => state.auth);

  const isFavorited = (imdbId) => favorites.some(f => f.imdbId === imdbId);

  const toggleFavorite = async (movie) => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    if (isFavorited(movie.imdbID)) {
      await axiosInstance.delete(`/favorites/${movie.imdbID}`);
      dispatch(removeFavorite(movie.imdbID));
    } else {
      const res = await axiosInstance.post('/favorites', {
        imdbId: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
      });
      dispatch(addFavorite(res.data));
    }
  };

  return { isFavorited, toggleFavorite };
};

export default useFavorite;