require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");

const User = require("./model/User");
const Product = require("./model/Product");
const Category = require("./model/Category");
const Order = require("./model/Order");
const Review = require("./model/Review");

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    console.log("🗑️ Existing data cleared");

    // -----------------------------
    // USERS
    // -----------------------------

    const users = await User.insertMany([
      {
        name: "Satyam Kumar",
        email: "satyam@example.com",
        password: "hashed_password_123",
        phone: "9876543210",
        role: "customer",
        address: {
          street: "Main Road",
          city: "Patna",
          state: "Bihar",
          pincode: "800001",
          country: "India",
        },
      },

      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: "hashed_password_456",
        phone: "9876543211",
        role: "customer",
        address: {
          street: "MG Road",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
          country: "India",
        },
      },

      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin_password",
        role: "admin",
      },
    ]);

    console.log(`👤 ${users.length} users created`);

    // -----------------------------
    // CATEGORIES
    // -----------------------------

    const categories = await Category.insertMany([
      {
        name: "Electronics",
        description: "Electronic devices and accessories",
        image: "https://example.com/electronics.jpg",
      },

      {
        name: "Clothing",
        description: "Men and women fashion products",
        image: "https://example.com/clothing.jpg",
      },

      {
        name: "Books",
        description: "Books and educational materials",
        image: "https://example.com/books.jpg",
      },

      {
        name: "Home & Kitchen",
        description: "Home appliances and kitchen products",
        image: "https://example.com/home.jpg",
      },
    ]);

    console.log(`📂 ${categories.length} categories created`);

    // -----------------------------
    // PRODUCTS
    // -----------------------------

    const electronics = categories.find(
      (category) => category.name === "Electronics"
    );

    const clothing = categories.find(
      (category) => category.name === "Clothing"
    );

    const books = categories.find(
      (category) => category.name === "Books"
    );

    const homeKitchen = categories.find(
      (category) => category.name === "Home & Kitchen"
    );

    const products = await Product.insertMany([
      {
        name: "MacBook Air M3",
        description:
          "Apple MacBook Air with M3 chip, 13-inch Retina display and 8GB RAM.",
        price: 99999,
        category: electronics._id,
        stock: 25,
        rating: 4.7,
        tags: ["laptop", "apple", "computer"],
        brand: "Apple",
        images: ["macbook.jpg"],
      },

      {
        name: "iPhone 16",
        description:
          "Latest Apple iPhone with powerful performance and advanced camera.",
        price: 79999,
        category: electronics._id,
        stock: 40,
        rating: 4.6,
        tags: ["phone", "apple", "smartphone"],
        brand: "Apple",
        images: ["iphone.jpg"],
      },

      {
        name: "Sony WH-1000XM5",
        description:
          "Premium wireless noise-cancelling headphones.",
        price: 29999,
        category: electronics._id,
        stock: 30,
        rating: 4.8,
        tags: ["headphones", "sony", "wireless"],
        brand: "Sony",
        images: ["sony-headphones.jpg"],
      },

      {
        name: "Men's Cotton T-Shirt",
        description:
          "Comfortable regular-fit cotton t-shirt.",
        price: 799,
        category: clothing._id,
        stock: 100,
        rating: 4.3,
        tags: ["tshirt", "men", "cotton"],
        brand: "Roadster",
        images: ["tshirt.jpg"],
      },

      {
        name: "JavaScript: The Definitive Guide",
        description:
          "Comprehensive guide to modern JavaScript programming.",
        price: 899,
        category: books._id,
        stock: 50,
        rating: 4.8,
        tags: ["javascript", "programming", "book"],
        brand: "O'Reilly",
        images: ["javascript-book.jpg"],
      },

      {
        name: "Air Fryer 4.5L",
        description:
          "Digital air fryer with multiple cooking modes.",
        price: 4999,
        category: homeKitchen._id,
        stock: 20,
        rating: 4.5,
        tags: ["air-fryer", "kitchen", "appliance"],
        brand: "Philips",
        images: ["air-fryer.jpg"],
      },
    ]);

    console.log(`📦 ${products.length} products created`);

    // -----------------------------
    // ORDERS
    // -----------------------------

    const orders = await Order.insertMany([
      {
        user: users[0]._id,

        items: [
          {
            product: products[0]._id,
            quantity: 1,
            price: products[0].price,
          },

          {
            product: products[2]._id,
            quantity: 1,
            price: products[2].price,
          },
        ],

        totalAmount: 129998,

        shippingAddress: {
          street: "Main Road",
          city: "Patna",
          state: "Bihar",
          pincode: "800001",
          country: "India",
        },

        paymentMethod: "UPI",
        paymentStatus: "paid",
        orderStatus: "delivered",
      },

      {
        user: users[1]._id,

        items: [
          {
            product: products[3]._id,
            quantity: 2,
            price: products[3].price,
          },
        ],

        totalAmount: 1598,

        shippingAddress: {
          street: "MG Road",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
          country: "India",
        },

        paymentMethod: "COD",
        paymentStatus: "pending",
        orderStatus: "confirmed",
      },
    ]);

    console.log(`🛒 ${orders.length} orders created`);

    // -----------------------------
    // REVIEWS
    // -----------------------------

    const reviews = await Review.insertMany([
      {
        product: products[0]._id,
        user: users[0]._id,
        rating: 5,
        title: "Amazing laptop",
        comment:
          "The MacBook Air is fast, lightweight and has excellent battery life.",
        isVerifiedPurchase: true,
      },

      {
        product: products[2]._id,
        user: users[0]._id,
        rating: 5,
        title: "Excellent headphones",
        comment:
          "Great sound quality and noise cancellation.",
        isVerifiedPurchase: true,
      },

      {
        product: products[3]._id,
        user: users[1]._id,
        rating: 4,
        title: "Good quality",
        comment:
          "Comfortable cotton material and good fitting.",
        isVerifiedPurchase: false,
      },
    ]);

    console.log(`⭐ ${reviews.length} reviews created`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("📦 Database: ecommerce");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();
