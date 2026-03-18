import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../store/authSlice";
import axiosInstance from "../api/api";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
      setMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-nf-dark text-white px-4 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full max-w-full overflow-hidden">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-widest text-nf-red shrink-0">
          MOVIEX
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/search" className="text-sm text-nf-muted hover:text-white transition-colors">
            Search
          </Link>
          {user ? (
            <>
              <Link to="/favorites" className="text-sm text-nf-muted hover:text-white transition-colors">
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
              <Link to="/login" className="text-sm text-nf-muted hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm px-4 py-1 rounded font-medium bg-nf-red text-white hover:opacity-90 transition-opacity">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer text-nf-muted hover:text-white transition-colors shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-12 left-0 right-0 z-[999] bg-nf-dark border-t border-nf-border md:hidden">
          <div className="flex flex-col gap-1 p-4 w-full">
            <Link
              to="/search"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-nf-muted hover:text-white transition-colors py-2"
            >
              Search
            </Link>
            {user ? (
              <>
                <Link
                  to="/favorites"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-nf-muted hover:text-white transition-colors py-2"
                >
                  Favorites
                </Link>
                <span className="text-sm text-nf-muted py-2">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded font-medium text-left bg-nf-red text-white hover:opacity-90 transition-opacity w-fit"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-nf-muted hover:text-white transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm px-4 py-2 rounded font-medium text-center bg-nf-red text-white hover:opacity-90 transition-opacity w-fit"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;