import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nf-bg flex flex-col items-center justify-center px-6 text-center relative">

      {/* Subtle red glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(229,9,20,0.15) 0%, transparent 70%)',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Logo */}
      <div className="text-4xl font-bold tracking-widest mb-6 text-nf-red">
        MOVIEX
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-nf-text">
        Discover Your Next <br />
        <span className="text-nf-red">Favorite Movie</span>
      </h1>

      {/* Subtext */}
      <p className="text-base md:text-lg mb-8 max-w-md text-nf-muted">
        Search from thousands of movies, save your favorites, and never run out of something to watch.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/search')}
        className="bg-nf-red px-8 py-3 text-base font-semibold rounded text-white hover:opacity-90 transition-opacity"
      >
        Search Movies →
      </button>

      {/* Stats row */}
      <div className="flex gap-8 mt-12 text-sm text-nf-muted">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-nf-text">10K+</span>
          <span>Movies</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-nf-text">Free</span>
          <span>No subscription</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-nf-text">❤️</span>
          <span>Save favorites</span>
        </div>
      </div>
    </div>
  );
};

export default Home;