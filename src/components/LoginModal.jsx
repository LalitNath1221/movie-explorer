import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '../store/authSlice';
import Login from '../pages/Login';
import Register from '../pages/Register';

const LoginModal = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) dispatch(closeLoginModal());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-lg relative bg-nf-card">

        {/* Close button */}
        <button
          onClick={() => dispatch(closeLoginModal())}
          className="absolute top-4 right-4 text-nf-muted hover:text-white transition-colors text-lg z-10"
        >
          ✕
        </button>

        {/* Tab switcher */}
        <div
          className="flex rounded-t overflow-hidden"
          style={{ border: '1px solid var(--color-nf-border)' }}
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${isLogin ? 'bg-nf-red text-white' : 'text-nf-muted hover:text-white'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${!isLogin ? 'bg-nf-red text-white' : 'text-nf-muted hover:text-white'}`}
          >
            Register
          </button>
        </div>

        {/* Render existing pages directly */}
        {isLogin ? <Login isModal onSwitch={() => setIsLogin(false)} /> : <Register isModal onSwitch={() => setIsLogin(true)} />}

      </div>
    </div>
  );
};

export default LoginModal;