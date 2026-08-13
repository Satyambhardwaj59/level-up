import { Product } from "@/types/day-39";

let products: Product[] = [
  {
    id: 1,
    title: "iPhone 15",
    description: "Latest Apple smartphone",
    price: 799,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    description: "Noise cancelling headphones",
    price: 149,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Running Shoes",
    description: "Comfortable running shoes",
    price: 89,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function getProducts() {
  return products;
}

export function getProductById(id: number) {
  return products.find(
    (product) => product.id === id
  );
}

export function createProduct(
  data: Omit<Product, "id">
) {
  const newProduct: Product = {
    id:
      products.length > 0
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1,

    ...data,
  };

  products.push(newProduct);

  return newProduct;
}

export function updateProduct(
  id: number,
  data: Partial<Omit<Product, "id">>
) {
  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...data,
  };

  return products[index];
}

export function deleteProduct(id: number) {
  const productExists = products.some(
    (product) => product.id === id
  );

  if (!productExists) {
    return false;
  }

  products = products.filter(
    (product) => product.id !== id
  );

  return true;
}