import { NextRequest, NextResponse } from "next/server";

import {
  createProduct,
  getProducts,
} from "@/lib/day-39/products";


// GET /api/products
// GET /api/products?search=phone
// GET /api/products?category=electronics
// GET /api/products?sort=price

export async function GET(request: NextRequest) {
  const { searchParams } =
    new URL(request.url);

  const search = searchParams.get("search");
  const category =
    searchParams.get("category");
  const sort = searchParams.get("sort");

  let products = [...getProducts()];

  // Search
  if (search) {
    products = products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // Category
  if (category) {
    products = products.filter(
      (product) =>
        product.category.toLowerCase() ===
        category.toLowerCase()
    );
  }

  // Sorting
  if (sort === "price") {
    products.sort(
      (a, b) => a.price - b.price
    );
  }

  return NextResponse.json({
    success: true,
    count: products.length,
    data: products,
  });
}


// POST /api/products

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      price,
      category,
      image,
    } = body;

    // Validation
    if (
      !title ||
      !description ||
      price === undefined ||
      !category ||
      !image
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields are required",
        },
        { status: 400 }
      );
    }

    if (
      typeof price !== "number" ||
      price <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Price must be a positive number",
        },
        { status: 400 }
      );
    }

    const product = createProduct({
      title,
      description,
      price,
      category,
      image,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}