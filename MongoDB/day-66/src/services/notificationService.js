const Notification = require("../models/Notification");

let io;

const setSocketIO = (socketIO) => {
  io = socketIO;
};

const createNotification = async ({
  type,
  message,
  userId = null,
  orderId = null,
  productId = null,
}) => {
  try {
    const notification =
      await Notification.create({
        type,
        message,
        userId,
        orderId,
        productId,
      });

    console.log("🔔 Notification:", message);

    if (io) {
      io.emit("notification", {
        id: notification._id,
        type: notification.type,
        message: notification.message,
        orderId: notification.orderId,
        productId: notification.productId,
        createdAt: notification.createdAt,
      });
    }

    return notification;
  } catch (error) {
    console.error(
      "Notification error:",
      error.message
    );
  }
};

module.exports = {
  setSocketIO,
  createNotification,
};