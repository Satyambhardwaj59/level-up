import {
  createCheckout,
  findOrderById
} from "../repositories/orderRepository.js";

export async function checkout(data) {
  return createCheckout(data);
}

export async function getOrder(id) {
  const order = await findOrderById(id);

  if (!order) {
    const error = new Error(
      "Order not found"
    );

    error.statusCode = 404;

    throw error;
  }

  return order;
}