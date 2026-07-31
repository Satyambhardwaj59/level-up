import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = memo(({ onClick }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-highlight/10 rounded-lg transition-all duration-300 hover:scale-110"
      aria-label="Open cart"
    >
      <FaShoppingCart className="text-2xl text-white" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {totalQuantity}
        </span>
      )}
    </button>
  );
});

CartIcon.displayName = 'CartIcon';

export default CartIcon;