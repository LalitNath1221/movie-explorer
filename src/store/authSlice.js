import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    favorites: [],
    showLoginModal: false,

  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(f => f.imdbId !== action.payload);
    },
    clearAuth: (state) => {
      state.user = null;
      state.favorites = [];
    },
    openLoginModal: (state) => { state.showLoginModal = true; },
    closeLoginModal: (state) => { state.showLoginModal = false; },

  }
});

export const { setUser, setFavorites, addFavorite, removeFavorite, clearAuth, openLoginModal, closeLoginModal } = authSlice.actions;
export default authSlice.reducer;