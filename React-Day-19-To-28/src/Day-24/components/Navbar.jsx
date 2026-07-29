import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-secondary/80 backdrop-blur-sm border-b border-highlight/20 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-highlight transition-transform group-hover:rotate-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-highlight to-pink-500 bg-clip-text text-transparent">
              MovieSearch
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              🎬 Find your favorite movies
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;