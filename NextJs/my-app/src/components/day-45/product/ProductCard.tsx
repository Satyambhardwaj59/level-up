'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/Day-45/product';
import { Button } from '@/components/day-45/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/day-45/ui/Card';
import { useAppDispatch } from '@/hooks/redux';
import { addToCart } from '@/store/slices/cartSlice';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/day-45/products/${product.id}`}>
        <div className="relative h-64 w-full bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/day-45/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating?.rate.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500 capitalize">
          {product.category}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}