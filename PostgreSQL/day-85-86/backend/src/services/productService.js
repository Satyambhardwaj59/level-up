import {
  findProducts,
  findProductById,
  searchByMetadata
} from "../repositories/productRepository.js";

export async function getProducts(query) {
  return findProducts({
    categoryId: query.categoryId,
    active: query.active !== "false",
    limit: Math.min(
      Number(query.limit) || 20,
      100
    ),
    offset: Number(query.offset) || 0
  });
}

export async function getProduct(id) {
  const product = await findProductById(id);

  if (!product) {
    const error = new Error(
      "Product not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return product;
}

export async function filterProducts(metadata) {
  return searchByMetadata(metadata);
}