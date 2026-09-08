const Order = require("../models/Order");

const {
  createNotification,
} = require("./notificationService");

const startOrderStream = () => {
  const pipeline = [
    {
      $match: {
        $or: [
          {
            operationType: "insert",
          },
          {
            operationType: "update",
            "updateDescription.updatedFields.status":
              {
                $exists: true,
              },
          },
        ],
      },
    },
  ];

  const changeStream =
    Order.watch(pipeline, {
      fullDocument: "updateLookup",
    });

  console.log(
    "👀 Order Change Stream started"
  );

  changeStream.on("change", async (change) => {
    try {
      // -------------------------
      // NEW ORDER
      // -------------------------

      if (
        change.operationType === "insert"
      ) {
        const order =
          change.fullDocument;

        console.log(
          "🟢 New Order:",
          order._id
        );

        await createNotification({
          type: "ORDER_CREATED",
          message:
            `New Order #${order._id}`,
          userId: order.user,
          orderId: order._id,
        });

        return;
      }

      // -------------------------
      // STATUS UPDATE
      // -------------------------

      if (
        change.operationType === "update"
      ) {
        const status =
          change.updateDescription
            ?.updatedFields?.status;

        if (!status) {
          return;
        }

        const order =
          change.fullDocument;

        console.log(
          `🟡 Order ${order._id} → ${status}`
        );

        await createNotification({
          type: "ORDER_STATUS_CHANGED",
          message:
            `Order #${order._id} is now ${status}`,
          userId: order.user,
          orderId: order._id,
        });
      }
    } catch (error) {
      console.error(
        "Order stream error:",
        error.message
      );
    }
  });

  changeStream.on("error", (error) => {
    console.error(
      "Order Change Stream error:",
      error.message
    );
  });

  return changeStream;
};

module.exports = startOrderStream;