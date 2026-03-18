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
      // save token to localStorage
      if (action.payload.token) {
        //console.log(action.payload.token)
        localStorage.setItem('token', action.payload.token);
      }
      // store user without token in state
      const { token, ...user } = action.payload;
      state.user = user;
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
      localStorage.removeItem('token'); // clear token on logout
    },
    openLoginModal: (state) => { state.showLoginModal = true; },
    closeLoginModal: (state) => { state.showLoginModal = false; },
  }
});

export const { setUser, setFavorites, addFavorite, removeFavorite, clearAuth, openLoginModal, closeLoginModal } = authSlice.actions;
export default authSlice.reducer;