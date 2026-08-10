// lib/products.ts
import { Product } from '@/types/day-36/product';

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Classic Backpack',
    description: 'Durable backpack with multiple compartments',
    price: 49.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 299.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Coffee Mug Set',
    description: 'Set of 4 ceramic coffee mugs with unique designs',
    price: 24.99,
    category: 'home',
    image: 'https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwY3VwfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned sole',
    price: 89.99,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with USB charging port',
    price: 34.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1621447980929-6638614633c8?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return products.find((p) => p.id === parseInt(id));
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}