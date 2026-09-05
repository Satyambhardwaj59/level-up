const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "ecommerce";

const client = new MongoClient(MONGO_URI);

const names = [
  "Satyam Kumar",
  "Rahul Sharma",
  "Aman Verma",
  "Priya Singh",
  "Rohit Kumar",
  "Neha Gupta",
  "Ankit Raj",
  "Sneha Singh",
  "Vikas Sharma",
  "Pooja Kumari",
];

const cities = [
  "Patna",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Chennai",
];

function generateUser(index) {
  const name = names[index % names.length];

  return {
    name: `${name} ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    city: cities[index % cities.length],
    role: "customer",
    createdAt: new Date(),
  };
}

async function seed() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);

    const users = db.collection("users");
    const products = db.collection("products");
    const orders = db.collection("orders");

    console.log("Connected to MongoDB");

    // Remove previous Day 63 test data
    await users.deleteMany({
      day63TestData: true,
    });

    await orders.deleteMany({
      day63TestData: true,
    });

    // --------------------------------
    // USERS
    // --------------------------------

    const userData = [];

    for (let i = 0; i < 100; i++) {
      const user = generateUser(i);

      user.day63TestData = true;

      userData.push(user);
    }

    const userResult = await users.insertMany(userData);

    const userIds = Object.values(userResult.insertedIds);

    console.log(`Created ${userIds.length} users`);

    // --------------------------------
    // PRODUCTS
    // --------------------------------

    const productList = await products
      .find({
        performanceTest: true,
      })
      .limit(500)
      .toArray();

    if (productList.length === 0) {
      throw new Error(
        "No Day 62 products found. Run Day 62 seed.js first."
      );
    }

    // --------------------------------
    // ORDERS
    // --------------------------------

    const ordersData = [];

    for (let i = 0; i < 1000; i++) {
      const userId =
        userIds[Math.floor(Math.random() * userIds.length)];

      const itemCount = Math.floor(Math.random() * 4) + 1;

      const items = [];
      let totalAmount = 0;

      for (let j = 0; j < itemCount; j++) {
        const product =
          productList[
            Math.floor(Math.random() * productList.length)
          ];

        const quantity =
          Math.floor(Math.random() * 3) + 1;

        items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity,
        });

        totalAmount += product.price * quantity;
      }

      ordersData.push({
        userId,
        items,
        totalAmount,
        status: [
          "pending",
          "confirmed",
          "shipped",
          "delivered",
        ][Math.floor(Math.random() * 4)],
        paymentMethod: ["UPI", "CARD", "COD"][
          Math.floor(Math.random() * 3)
        ],
        createdAt: new Date(
          Date.now() -
            Math.floor(
              Math.random() * 180 * 24 * 60 * 60 * 1000
            )
        ),
        day63TestData: true,
      });
    }

    await orders.insertMany(ordersData);

    console.log(`Created ${ordersData.length} orders`);

    console.log("\nDay 63 seed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await client.close();
  }
}

seed();