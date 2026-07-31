import React, { memo, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

const AddToCartNotification = memo(({ product, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-secondary border border-green-500/30 rounded-lg p-4 shadow-2xl animate-slide-up max-w-sm">
      <div className="flex items-center gap-3">
        <div className="bg-green-500/20 p-2 rounded-full">
          <FaCheck className="text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">Added to Cart!</p>
          <p className="text-gray-400 text-xs truncate">{product.title}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
});

AddToCartNotification.displayName = 'AddToCartNotification';

export default AddToCartNotification;