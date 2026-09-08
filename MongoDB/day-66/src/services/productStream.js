const Product = require("../models/Product");

const {
  createNotification,
} = require("./notificationService");

const checkLowStock = async (product) => {
  if (product.stock <= 5) {
    await createNotification({
      type: "LOW_STOCK",
      message:
        `⚠️ Low Stock Alert: ${product.name} - Remaining: ${product.stock}`,
      productId: product._id,
    });
  }
};

const startProductStream = () => {
  const changeStream = Product.watch(
    [],
    {
      fullDocument: "updateLookup",
    }
  );

  console.log(
    "👀 Product Change Stream started"
  );

  changeStream.on("change", async (change) => {
    try {
      const productId =
        change.documentKey?._id;

      switch (change.operationType) {
        case "insert": {
          const product =
            change.fullDocument;

          console.log(
            "🟢 Product Created:",
            product.name
          );

          await createNotification({
            type: "PRODUCT_CREATED",
            message:
              `New product created: ${product.name}`,
            productId,
          });

          if (product.stock <= 5) {
            await checkLowStock(product);
          }

          break;
        }

        case "update": {
          console.log(
            "🟡 Product Updated:",
            productId
          );

          await createNotification({
            type: "PRODUCT_UPDATED",
            message:
              `Product updated: ${productId}`,
            productId,
          });

          if (change.fullDocument) {
            await checkLowStock(
              change.fullDocument
            );
          }

          break;
        }

        case "delete": {
          console.log(
            "🔴 Product Deleted:",
            productId
          );

          await createNotification({
            type: "PRODUCT_DELETED",
            message:
              `Product deleted: ${productId}`,
            productId,
          });

          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error(
        "Product stream error:",
        error.message
      );
    }
  });

  changeStream.on("error", (error) => {
    console.error(
      "Product Change Stream error:",
      error.message
    );
  });

  return changeStream;
};

module.exports = startProductStream;