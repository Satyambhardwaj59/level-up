const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      items,
      simulatePaymentFailure,
    } = req.body;

    const order = await orderService.createOrder({
      userId,
      items,
      simulatePaymentFailure,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};