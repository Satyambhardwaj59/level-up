const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "ORDER_CREATED",
        "ORDER_STATUS_CHANGED",
        "LOW_STOCK",
        "PRODUCT_CREATED",
        "PRODUCT_UPDATED",
        "PRODUCT_DELETED",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);