import { AlertCircle, RefreshCw } from 'lucide-react';

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md w-full text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-400 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-400 mb-6">{message || 'An error occurred while fetching movies.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 
                     text-red-400 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;