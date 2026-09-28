import {
  checkout,
  getOrder
} from "../services/orderService.js";

export async function createOrder(req, res) {
  const result = await checkout({
    userId: Number(req.body.userId),
    productId: Number(req.body.productId),
    quantity: Number(req.body.quantity)
  });

  res.status(201).json({
    success: true,
    data: result
  });
}

export async function getOrderById(req, res) {
  const order =
    await getOrder(req.params.id);

  res.json({
    success: true,
    data: order
  });
}