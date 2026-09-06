require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./src/models/User");
const Product = require("./src/models/Product");
const Category = require("./src/models/Category");
const Order = require("./src/models/Order");
const Review = require("./src/models/Review");

async function runQueries() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected\n");

    // ==========================================
    // 1. Create category
    // ==========================================

    let category = await Category.findOne({
      name: "Day 64 Electronics",
    });

    if (!category) {
      category = await Category.create({
        name: "Day 64 Electronics",
        description: "Electronics for Day 64 testing",
      });
    }

    console.log("1. Category:");
    console.log(category);


    // ==========================================
    // 2. Create user with embedded addresses
    // ==========================================

    let user = await User.findOne({
      email: "day64@example.com",
    });

    if (!user) {
      user = await User.create({
        name: "Day 64 Customer",
        email: "day64@example.com",
        password: "hashed-password",

        addresses: [
          {
            type: "home",
            street: "Main Road",
            city: "Patna",
            state: "Bihar",
            pincode: "800001",
            country: "India",
            isDefault: true,
          },

          {
            type: "work",
            street: "Office Road",
            city: "Patna",
            state: "Bihar",
            pincode: "800020",
            country: "India",
            isDefault: false,
          },
        ],
      });
    }

    console.log("\n2. User with addresses:");
    console.log(user);


    // ==========================================
    // 3. Create product
    // ==========================================

    let product = await Product.findOne({
      name: "Day 64 MacBook",
    });

    if (!product) {
      product = await Product.create({
        name: "Day 64 MacBook",

        description:
          "MacBook created for MongoDB schema testing",

        price: 99999,

        category: category._id,

        brand: "Apple",

        stock: 25,

        images: [
          "macbook-front.jpg",
          "macbook-side.jpg",
        ],

        tags: [
          "laptop",
          "apple",
          "computer",
        ],

        rating: {
          average: 4.8,
          count: 150,
        },
      });
    }

    console.log("\n3. Product:");
    console.log(product);


    // ==========================================
    // 4. Populate category
    // ==========================================

    const populatedProduct = await Product
      .findById(product._id)
      .populate("category");

    console.log("\n4. Product with category:");
    console.log(populatedProduct);


    // ==========================================
    // 5. Create order
    // ==========================================

    const order = await Order.create({
      user: user._id,

      items: [
        {
          product: product._id,

          quantity: 2,

          // Historical price
          price: 99999,
        },
      ],

      totalAmount: 199998,

      status: "confirmed",

      paymentStatus: "paid",

      shippingAddress: {
        street: "Main Road",
        city: "Patna",
        state: "Bihar",
        pincode: "800001",
        country: "India",
      },
    });

    console.log("\n5. Order:");
    console.log(order);


    // ==========================================
    // 6. Populate order user + product
    // ==========================================

    const populatedOrder = await Order
      .findById(order._id)
      .populate("user")
      .populate("items.product");

    console.log("\n6. Populated order:");
    console.dir(populatedOrder, {
      depth: null,
    });


    // ==========================================
    // 7. Create review
    // ==========================================

    const existingReview = await Review.findOne({
      user: user._id,
      product: product._id,
    });

    if (!existingReview) {
      const review = await Review.create({
        user: user._id,

        product: product._id,

        rating: 5,

        comment:
          "Excellent product. Very fast and reliable.",
      });

      console.log("\n7. Review:");
      console.log(review);
    }


    // ==========================================
    // 8. Product reviews
    // ==========================================

    const productReviews = await Review
      .find({
        product: product._id,
      })
      .populate("user", "name email");

    console.log("\n8. Product reviews:");
    console.dir(productReviews, {
      depth: null,
    });


    // ==========================================
    // 9. User orders
    // ==========================================

    const userOrders = await Order
      .find({
        user: user._id,
      })
      .populate("items.product", "name price");

    console.log("\n9. User orders:");
    console.dir(userOrders, {
      depth: null,
    });


    // ==========================================
    // 10. Embedded address update
    // ==========================================

    user.addresses[0].city = "Muzaffarpur";

    await user.save();

    console.log("\n10. Updated embedded address:");
    console.log(user.addresses[0]);


    console.log("\n🎉 All Day 64 queries completed!");
  } catch (error) {
    console.error("❌ Query failed:");
    console.error(error.message);
  } finally {
    await mongoose.connection.close();
  }
}

runQueries();