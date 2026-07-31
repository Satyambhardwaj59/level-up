import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import CartIcon from './CartIcon';
import CartSidebar from './CartSidebar';

const Navbar = memo(() => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="bg-secondary/80 backdrop-blur-sm border-b border-highlight/20 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <FaShoppingBag className="text-2xl text-highlight transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-highlight to-pink-500 bg-clip-text text-transparent">
                ProductCatalog
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden sm:block">
                🛍️ Discover amazing products
              </span>
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;