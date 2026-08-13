"use server";

import {
  createProduct,
} from "@/lib/day-39/products";

export interface ProductFormState {
  success: boolean;
  message: string;
}

export async function createProductAction(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const title =
    formData.get("title")?.toString().trim();

  const description =
    formData
      .get("description")
      ?.toString()
      .trim();

  const priceValue =
    formData.get("price")?.toString();

  const category =
    formData
      .get("category")
      ?.toString()
      .trim();

  const image =
    formData.get("image")?.toString().trim();

  // Validation

  if (
    !title ||
    !description ||
    !priceValue ||
    !category ||
    !image
  ) {
    return {
      success: false,
      message: "All fields are required",
    };
  }

  const price = Number(priceValue);

  if (
    Number.isNaN(price) ||
    price <= 0
  ) {
    return {
      success: false,
      message:
        "Price must be a positive number",
    };
  }

  // Database operation

  createProduct({
    title,
    description,
    price,
    category,
    image,
  });

  return {
    success: true,
    message:
      "Product created successfully!",
  };
}