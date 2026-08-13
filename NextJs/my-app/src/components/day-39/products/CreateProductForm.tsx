"use client";

import { useActionState } from "react";

import {
  createProductAction,
  ProductFormState,
} from "@/actions/day-39/productActions";

const initialState: ProductFormState = {
  success: false,
  message: "",
};

export default function CreateProductForm() {
  const [state, formAction, pending] =
    useActionState(
      createProductAction,
      initialState
    );

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      {/* Product Name */}

      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-medium"
        >
          Product Name
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter product name"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Description */}

      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          rows={5}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Price */}

      <div>
        <label
          htmlFor="price"
          className="mb-2 block font-medium"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          placeholder="Enter price"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Category */}

      <div>
        <label
          htmlFor="category"
          className="mb-2 block font-medium"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          className="w-full rounded-lg border px-4 py-3"
          defaultValue=""
        >
          <option value="" disabled>
            Select category
          </option>

          <option value="electronics">
            Electronics
          </option>

          <option value="fashion">
            Fashion
          </option>

          <option value="jewellery">
            Jewellery
          </option>
        </select>
      </div>

      {/* Image */}

      <div>
        <label
          htmlFor="image"
          className="mb-2 block font-medium"
        >
          Image URL
        </label>

        <input
          id="image"
          name="image"
          type="url"
          placeholder="https://..."
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Error / Success */}

      {state.message && (
        <p
          className={
            state.success
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {state.message}
        </p>
      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending
          ? "Creating..."
          : "Create Product"}
      </button>
    </form>
  );
}