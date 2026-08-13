import { NextRequest, NextResponse } from "next/server";

import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/day-39/products";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}


// GET /api/products/:id

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid product ID",
      },
      { status: 400 }
    );
  }

  const product =
    getProductById(productId);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        message: "Product not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}


// PUT /api/products/:id

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const product = updateProduct(
      productId,
      body
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Product updated successfully",
      data: product,
    });
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


// DELETE /api/products/:id

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid product ID",
      },
      { status: 400 }
    );
  }

  const deleted =
    deleteProduct(productId);

  if (!deleted) {
    return NextResponse.json(
      {
        success: false,
        message: "Product not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Product deleted successfully",
  });
}