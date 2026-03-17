import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../store/authSlice";
import axiosInstance from "../api/api";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(clearAuth());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-nf-dark text-white px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-widest text-nf-red">
          MOVIEX
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/search"
            className="text-sm text-nf-muted hover:text-white transition-colors"
          >
            Search
          </Link>
          {user ? (
            <>
              <Link
                to="/favorites"
                className="text-sm text-nf-muted hover:text-white transition-colors"
              >
                Favorites
              </Link>
              <span className="text-sm text-nf-muted">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-1 rounded font-medium bg-nf-red text-white hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-nf-muted hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-1 rounded font-medium bg-nf-red text-white hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-nf-border">
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-nf-muted hover:text-white transition-colors"
          >
            Search
          </Link>
          {user ? (
            <>
              <Link
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-nf-muted hover:text-white transition-colors"
              >
                Favorites
              </Link>
              <span className="text-sm text-nf-muted">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded font-medium w-full text-left bg-nf-red text-white hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-nf-muted hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm px-4 py-2 rounded font-medium text-center bg-nf-red text-white hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
