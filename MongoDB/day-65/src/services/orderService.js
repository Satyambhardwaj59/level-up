const mongoose = require("mongoose");

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const createOrder = async ({
  userId,
  items,
  simulatePaymentFailure = false,
}) => {
  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
    
      // 1. Validate input

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
      }

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Order must contain items");
      }

      // 2. Validate user
    
      const user = await User.findById(userId).session(session);

      if (!user) {
        throw new Error("User not found");
      }

      // 3. Check products
    
      const orderItems = [];
      let totalAmount = 0;

      for (const item of items) {
        const { productId, quantity } = item;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
          throw new Error(`Invalid product ID: ${productId}`);
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw new Error(
            "Quantity must be a positive integer"
          );
        }

        const product = await Product.findById(productId)
          .session(session);

        if (!product) {
          throw new Error(
            `Product not found: ${productId}`
          );
        }

        // 4. Check inventory
      
        if (product.stock < quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}`
          );
        }

        // Historical purchase price
        orderItems.push({
          product: product._id,
          quantity,
          price: product.price,
        });

        totalAmount += product.price * quantity;
      }

      // 5. Create order
      const orders = await Order.create(
        [
          {
            user: user._id,
            items: orderItems,
            totalAmount,
            status: "confirmed",
            paymentStatus: "pending",
          },
        ],
        { session }
      );

      createdOrder = orders[0];

      // 6. Decrease inventory
      for (const item of items) {
        const result = await Product.updateOne(
          {
            _id: item.productId,
            stock: {
              $gte: item.quantity,
            },
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            session,
          }
        );

        if (result.modifiedCount !== 1) {
          throw new Error(
            `Inventory update failed for product ${item.productId}`
          );
        }
      }

      // 7. Simulate payment failure
      if (simulatePaymentFailure) {
        throw new Error(
          "Simulated payment creation failure"
        );
      }

      // 8. Create payment
      await Payment.create(
        [
          {
            order: createdOrder._id,
            user: user._id,
            amount: totalAmount,
            method: "upi",
            status: "success",
            transactionId:
              `TXN_${Date.now()}_${Math.random()
                .toString(36)
                .slice(2, 8)}`,
          },
        ],
        { session }
      );

      // 9. Update order payment status
      await Order.updateOne(
        {
          _id: createdOrder._id,
        },
        {
          $set: {
            paymentStatus: "paid",
          },
        },
        {
          session,
        }
      );
    });

    return await Order.findById(createdOrder._id)
      .populate("user", "name email")
      .populate("items.product", "name price stock");

  } finally {
    await session.endSession();
  }
};

module.exports = {
  createOrder,
};