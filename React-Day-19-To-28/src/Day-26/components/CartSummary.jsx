import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaCreditCard, FaTruck, FaGift } from 'react-icons/fa';

const CartSummary = memo(() => {
  const { totalQuantity, totalPrice, items } = useSelector((state) => state.cart);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-40">
      <div className="bg-secondary/95 backdrop-blur-sm border border-highlight/20 rounded-xl p-4 shadow-2xl animate-slide-up max-w-md ml-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-highlight/20 p-2 rounded-full">
              <FaShoppingCart className="text-highlight" />
            </div>
            <div>
              <p className="text-white font-semibold">
                {totalQuantity} items
              </p>
              <p className="text-highlight font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
              <FaTruck className="text-green-500" />
              <span>Free Shipping</span>
            </div>
            <button
              onClick={() => {
                const cartIcon = document.querySelector('[aria-label="Open cart"]');
                if (cartIcon) cartIcon.click();
              }}
              className="btn-primary flex items-center gap-2"
            >
              <FaCreditCard />
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CartSummary.displayName = 'CartSummary';

export default CartSummary;