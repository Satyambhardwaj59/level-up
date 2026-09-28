import {
  getProducts,
  getProduct,
  filterProducts
} from "../services/productService.js";

export async function listProducts(req, res) {
  const products = await getProducts(req.query);

  res.json({
    success: true,
    data: products
  });
}

export async function getProductById(req, res) {
  const product =
    await getProduct(req.params.id);

  res.json({
    success: true,
    data: product
  });
}

export async function metadataSearch(req, res) {
  const products =
    await filterProducts(req.body);

  res.json({
    success: true,
    data: products
  });
}