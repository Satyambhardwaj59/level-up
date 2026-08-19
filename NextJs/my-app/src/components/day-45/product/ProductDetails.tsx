'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types/Day-45/product';
import { Button } from '@/components/day-45/ui/Button';
import { useAppDispatch } from '@/hooks/redux';
import { addToCart } from '@/store/slices/cartSlice';
import { Star } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-gray-500 capitalize">{product.category}</p>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating?.rate || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>

        <p className="text-2xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        <p className="text-gray-600">{product.description}</p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <Button onClick={handleAddToCart} size="lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}