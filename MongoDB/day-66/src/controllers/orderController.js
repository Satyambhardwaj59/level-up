const Order = require("../models/Order");

const createOrder = async (req, res, next) => {
  try {
    const {
      user,
      items,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      user,
      items,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Order created",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
};