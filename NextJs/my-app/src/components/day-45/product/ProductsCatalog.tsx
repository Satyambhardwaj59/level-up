'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/day-45/product/ProductCard';
import { ProductFilters } from '@/components/day-45/product/ProductFilters';
import { Product, ProductFilters as ProductFiltersType } from '@/types/Day-45/product';

interface ProductsCatalogProps {
  products: Product[];
}

export function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [filters, setFilters] = useState<ProductFiltersType>({
    search: '',
    category: '',
    sort: 'price-asc',
  });

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category
        ? product.category.toLowerCase() === filters.category.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.title.localeCompare(b.title);
        case 'name-desc': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <ProductFilters onFilterChange={setFilters} />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">No products found</h2>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      )}
    </div>
  );
}