import { memo } from 'react';
import { Link } from 'react-router-dom';
import {  Calendar, Film } from 'lucide-react';

const MovieCard = memo(({ movie }) => {
  const { imdbID, Title, Year, Poster, Type } = movie;

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'movie': return 'bg-blue-500/20 text-blue-400';
      case 'series': return 'bg-green-500/20 text-green-400';
      case 'episode': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Link to={`/movie/${imdbID}`} className="block h-full">
      <div className="bg-secondary/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg 
                    border border-gray-800 hover:border-highlight/50 transition-all duration-300 
                    card-hover h-full flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
          {Poster && Poster !== 'N/A' ? (
            <img
              src={Poster}
              alt={Title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-primary">
              <Film className="w-16 h-16 text-gray-600" />
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getTypeColor(Type)}`}>
              {Type || 'Unknown'}
            </span>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-2 hover:text-highlight transition-colors">
            {Title}
          </h3>
          
          <div className="flex items-center gap-4 mt-auto text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{Year || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;