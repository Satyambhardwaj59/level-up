import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/day-45/product/ProductDetails';
import { Skeleton } from '@/components/day-45/ui/Skeleton';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${params.id}`
    );
    const product = await response.json();

    if (!product || product.id !== parseInt(params.id)) {
      return {
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.',
      };
    }

    return {
      title: `${product.title} | Product Store`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 160),
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.id}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    notFound();
  }

  const product = await response.json();

  if (!product || product.id !== parseInt(params.id)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} />
      </Suspense>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="h-96 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}