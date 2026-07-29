import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Film } from 'lucide-react';
import { movieApi } from '../services/movieApi';
import Loader from '../components/Loader';
import Error from '../components/Error';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await movieApi.getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Movie not found');
        }
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  if (!movie) return <Error message="Movie not found" />;

  const getRating = (source) => {
    const rating = movie.Ratings?.find(r => r.Source === source);
    return rating ? rating.Value : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary">
      <div className="container-custom py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Search
        </button>

        <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                    <Film className="w-20 h-20 text-gray-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {movie.Title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="px-3 py-1 bg-highlight/20 rounded-full text-highlight">
                    {movie.Type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.Year}
                  </span>
                  {movie.Runtime && movie.Runtime !== 'N/A' && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {movie.Runtime}
                    </span>
                  )}
                  {movie.Rated && movie.Rated !== 'N/A' && (
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full">
                      {movie.Rated}
                    </span>
                  )}
                </div>
              </div>

              {/* Ratings */}
              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="flex items-center gap-2 bg-primary/50 px-4 py-2 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{rating.Value}</span>
                      <span className="text-xs text-gray-400">{rating.Source}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Plot */}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Genre</h4>
                    <p className="text-sm">{movie.Genre}</p>
                  </div>
                )}
                {movie.Director && movie.Director !== 'N/A' && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Director</h4>
                    <p className="text-sm">{movie.Director}</p>
                  </div>
                )}
                {movie.Writer && movie.Writer !== 'N/A' && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Writer</h4>
                    <p className="text-sm">{movie.Writer}</p>
                  </div>
                )}
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Actors</h4>
                    <p className="text-sm">{movie.Actors}</p>
                  </div>
                )}
                {movie.Country && movie.Country !== 'N/A' && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Country</h4>
                    <p className="text-sm">{movie.Country}</p>
                  </div>
                )}
                {movie.Language && movie.Language !== 'N/A' && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Language</h4>
                    <p className="text-sm">{movie.Language}</p>
                  </div>
                )}
              </div>

              {/* IMDb Link */}
              {movie.imdbID && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 
                           text-yellow-400 rounded-lg transition-colors"
                >
                  View on IMDb
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;