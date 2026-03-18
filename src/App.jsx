import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setFavorites } from "./store/authSlice";
import axiosInstance from "./api/api";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

// Layout with Navbar

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axiosInstance.get("/auth/me");
        dispatch(setUser({ ...res.data, token }));
        const favRes = await axiosInstance.get("/favorites");
        dispatch(setFavorites(favRes.data));
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        console.log("token not found");
      }
    };
    initApp();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:imdbId" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
