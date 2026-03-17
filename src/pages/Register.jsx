import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setUser } from "../store/authSlice";
import axiosInstance from "../api/api";

const Register = ({ isModal = false, onSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      dispatch(setUser(res.data));
      navigate("/search");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isModal ? 'p-8' : 'min-h-screen bg-nf-bg flex items-center justify-center px-4'}>
    <div className={isModal ? '' : 'bg-nf-card w-full max-w-md p-8 rounded-lg'}>
        <div className="text-center mb-6">
          <span className="text-2xl font-bold tracking-widest text-nf-red">
            MOVIEX
          </span>
          <p className="text-nf-muted text-sm mt-1">Create your account</p>
        </div>
        {error && (
          <p className="text-nf-red text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none text-white placeholder:text-nf-muted"
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
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none text-white placeholder:text-nf-muted"
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none text-white placeholder:text-nf-muted"
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold text-sm bg-nf-red text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="text-nf-muted text-sm text-center mt-4">
          Already have an account?{" "}
          {isModal ? (
            <button onClick={onSwitch} className="text-nf-red hover:underline">
              Login
            </button>
          ) : (
            <Link to="/login" className="text-nf-red hover:underline">
              Login
            </Link>
          )}{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
