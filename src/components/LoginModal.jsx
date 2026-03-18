import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../store/authSlice";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { X } from "lucide-react";

const LoginModal = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) dispatch(closeLoginModal());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.9)" }}
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-xl relative overflow-hidden"
        style={{
          background: "var(--color-nf-card)",
          border: "1px solid var(--color-nf-border)",
        }}
      >
        {/* Top red accent bar */}
        <div className="h-1 w-full bg-nf-red" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <span className="text-xl font-bold tracking-widest text-nf-red">
              MOVIEX
            </span>
            <p className="text-nf-muted text-xs mt-0.5">
              {isLogin ? "Welcome back" : "Join for free"}
            </p>
          </div>
          <button
            onClick={() => dispatch(closeLoginModal())}
            className="text-nf-muted hover:text-white transition-colors p-1 rounded hover:bg-nf-input"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div
          className="flex mx-6 mb-2 rounded-lg overflow-hidden"
          style={{ background: "var(--color-nf-input)" }}
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all
              ${isLogin ? "bg-nf-red text-white shadow" : "text-nf-muted hover:text-white"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all
              ${!isLogin ? "bg-nf-red text-white shadow" : "text-nf-muted hover:text-white"}`}
          >
            Register
          </button>
        </div>

        <div className="px-6 py-2 text-center">
          {isLogin ? (
            <>
              <h2 className="text-white text-lg font-semibold">
                Welcome back to MOVIEX
              </h2>
              <p className="text-nf-muted text-sm mt-1">
                Sign in to access your favorites and pick up where you left off
              </p>
            </>
          ) : (
            <>
              <h2 className="text-white text-lg font-semibold">
                Start your MOVIEX journey
              </h2>
              <p className="text-nf-muted text-sm mt-1">
                Create a free account and never lose track of movies you love
              </p>
            </>
          )}
        </div>
        {/* Content */}
        <div className="px-2 pb-2">
          {isLogin ? (
            <Login isModal onSwitch={() => setIsLogin(false)} />
          ) : (
            <Register isModal onSwitch={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
