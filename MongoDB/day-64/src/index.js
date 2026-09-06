require("dotenv").config();

const connectDB = require("./config/db");

const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");
const Review = require("./models/Review");

const start = async () => {
  try {
    await connectDB();

    console.log("\n📚 Models loaded:");

    console.log("👤 User:", User.modelName);
    console.log("📦 Product:", Product.modelName);
    console.log("📂 Category:", Category.modelName);
    console.log("🛒 Order:", Order.modelName);
    console.log("⭐ Review:", Review.modelName);

    console.log("\n🚀 Day 64 schema setup completed!");
  } catch (error) {
    console.error(error);
  }
};

start();