import CartItem from "@/components/day-38/cart/CartItem";

export default function CartPage() {
  // Temporary cart data for today's architecture practice.
  // Later we can connect this to Context/Redux/Zustand.
  const cartItems = [
    {
      id: 1,
      title: "Fjallraven Backpack",
      price: 109.95,
      quantity: 2,
      image:
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      quantity: 1,
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
    },
  ];

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold">
        Shopping Cart
      </h1>

      <p className="mt-2 text-gray-600">
        Review your products before checkout.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border p-6">
          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between">
            <span>Subtotal</span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span>Shipping</span>

            <span className="text-green-600">
              Free
            </span>
          </div>

          <div className="my-6 border-t" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <button className="mt-6 w-full rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}