import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setUser, setFavorites, closeLoginModal } from "../store/authSlice";
import axiosInstance from "../api/api";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ isModal = false, onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      dispatch(setUser(res.data));
      const favRes = await axiosInstance.get("/favorites");
      dispatch(setFavorites(favRes.data));
      dispatch(closeLoginModal());
      if(!isModal){
        navigate("/search");
      }
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        isModal
          ? "p-8"
          : "min-h-screen bg-nf-bg flex items-center justify-center px-4"
      }
    >
      <div
        className={isModal ? "" : "bg-nf-card w-full max-w-md p-8 rounded-lg"}
      >
        {isModal?(<>
        <div className="text-center mb-6">
        <p className="text-nf-text text-sm mt-1">Sign in to your account</p>
        </div>
        </>):(
          <>
          <div className="text-center mb-6">
          <span className="text-2xl font-bold tracking-widest text-nf-red">
            MOVIEX
          </span>
          <p className="text-nf-muted text-sm mt-1">Sign in to your account</p>
        </div>
        </>
        )}
        {error && (
          <p className="text-nf-red text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none text-white placeholder:text-nf-muted [&:-webkit-autofill]:bg-nf-input
      [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_var(--color-nf-input)_inset]
      [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-nf-text)]"
            style={{
              background: "var(--color-nf-input)",
              border: "1px solid var(--color-nf-border)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--color-nf-red)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--color-nf-border)")
            }
          />
          <div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 pr-10 rounded text-sm outline-none 
      text-nf-text bg-nf-input border border-nf-border 
      focus:border-nf-red transition-colors placeholder:text-nf-muted
      autofill:bg-nf-input autofill:text-nf-text
      [&:-webkit-autofill]:bg-nf-input
      [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_var(--color-nf-input)_inset]
      [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-nf-text)]"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-nf-muted hover:text-white transition-colors"
  >
    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold text-sm bg-nf-red text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="text-nf-muted text-sm text-center mt-4">
          Don't have an account?{" "}
          {isModal ? (
            <button onClick={onSwitch} className="text-nf-red hover:underline">
              Register
            </button>
          ) : (
            <Link to="/register" className="text-nf-red hover:underline">
              Register
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
