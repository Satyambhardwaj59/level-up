const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "ecommerce";

const client = new MongoClient(MONGO_URI);

async function runAggregations() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);

    const products = db.collection("products");
    const orders = db.collection("orders");

    // 1. Average Product Price by Category
    console.log("\n1. Average Product Price by Category");

    const result1 = await products
      .aggregate([
        {
          $group: {
            _id: "$category",
            averagePrice: {
              $avg: "$price",
            },
          },
        },
        {
          $sort: {
            averagePrice: -1,
          },
        },
      ])
      .toArray();

    console.table(result1);


    // ==========================================
    // 2. Top 10 Most Expensive Products
    // ==========================================

    console.log("\n2. Top 10 Most Expensive Products");

    const result2 = await products
      .aggregate([
        {
          $sort: {
            price: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            _id: 0,
            name: 1,
            price: 1,
            brand: 1,
            category: 1,
          },
        },
      ])
      .toArray();

    console.table(result2);


    // ==========================================
    // 3. Products by Brand
    // ==========================================

    console.log("\n3. Products by Brand");

    const result3 = await products
      .aggregate([
        {
          $group: {
            _id: "$brand",

            numberOfProducts: {
              $sum: 1,
            },

            averagePrice: {
              $avg: "$price",
            },

            averageRating: {
              $avg: "$rating",
            },
          },
        },
        {
          $sort: {
            numberOfProducts: -1,
          },
        },
      ])
      .toArray();

    console.table(result3);


    // ==========================================
    // 4. Most Frequently Used Tags
    // ==========================================

    console.log("\n4. Most Frequently Used Tags");

    const result4 = await products
      .aggregate([
        {
          $unwind: "$tags",
        },
        {
          $group: {
            _id: "$tags",

            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 20,
        },
      ])
      .toArray();

    console.table(result4);


    // ==========================================
    // 5. Average Rating by Category
    // ==========================================

    console.log("\n5. Average Rating by Category");

    const result5 = await products
      .aggregate([
        {
          $group: {
            _id: "$category",

            averageRating: {
              $avg: "$rating",
            },
          },
        },
        {
          $sort: {
            averageRating: -1,
          },
        },
      ])
      .toArray();

    console.table(result5);


    // ==========================================
    // 6. Total Stock by Category
    // ==========================================

    console.log("\n6. Total Stock by Category");

    const result6 = await products
      .aggregate([
        {
          $group: {
            _id: "$category",

            totalStock: {
              $sum: "$stock",
            },

            productCount: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalStock: -1,
          },
        },
      ])
      .toArray();

    console.table(result6);


    // ==========================================
    // 7. Price Range Distribution
    // ==========================================

    console.log("\n7. Price Range Distribution");

    const result7 = await products
      .aggregate([
        {
          $bucket: {
            groupBy: "$price",

            boundaries: [
              0,
              1000,
              5000,
              10000,
              25000,
              50000,
              100000,
              Infinity,
            ],

            default: "100000+",

            output: {
              productCount: {
                $sum: 1,
              },

              averagePrice: {
                $avg: "$price",
              },
            },
          },
        },
      ])
      .toArray();

    console.table(result7);


    // ==========================================
    // 8. Available vs Unavailable Products
    // ==========================================

    console.log("\n8. Availability Statistics");

    const result8 = await products
      .aggregate([
        {
          $group: {
            _id: "$isAvailable",

            count: {
              $sum: 1,
            },
          },
        },
      ])
      .toArray();

    console.table(result8);


    // ==========================================
    // 9. Products with Low Stock
    // ==========================================

    console.log("\n9. Low Stock Products");

    const result9 = await products
      .aggregate([
        {
          $match: {
            stock: {
              $lt: 20,
            },
          },
        },
        {
          $sort: {
            stock: 1,
          },
        },
        {
          $limit: 20,
        },
        {
          $project: {
            _id: 0,
            name: 1,
            brand: 1,
            stock: 1,
            price: 1,
          },
        },
      ])
      .toArray();

    console.table(result9);


    // ==========================================
    // 10. Top Rated Products
    // ==========================================

    console.log("\n10. Top Rated Products");

    const result10 = await products
      .aggregate([
        {
          $match: {
            rating: {
              $gte: 4.5,
            },
          },
        },
        {
          $sort: {
            rating: -1,
            price: -1,
          },
        },
        {
          $limit: 20,
        },
        {
          $project: {
            _id: 0,
            name: 1,
            rating: 1,
            price: 1,
            brand: 1,
          },
        },
      ])
      .toArray();

    console.table(result10);


    // ==========================================
    // 11. Average Price by Brand
    // ==========================================

    console.log("\n11. Average Price by Brand");

    const result11 = await products
      .aggregate([
        {
          $group: {
            _id: "$brand",

            averagePrice: {
              $avg: "$price",
            },

            minimumPrice: {
              $min: "$price",
            },

            maximumPrice: {
              $max: "$price",
            },
          },
        },
        {
          $sort: {
            averagePrice: -1,
          },
        },
      ])
      .toArray();

    console.table(result11);


    // ==========================================
    // 12. Products Created Per Month
    // ==========================================

    console.log("\n12. Products Created Per Month");

    const result12 = await products
      .aggregate([
        {
          $group: {
            _id: {
              year: {
                $year: "$createdAt",
              },

              month: {
                $month: "$createdAt",
              },
            },

            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ])
      .toArray();

    console.table(result12);


    // ==========================================
    // 13. Orders by Status
    // ==========================================

    console.log("\n13. Orders by Status");

    const result13 = await orders
      .aggregate([
        {
          $group: {
            _id: "$status",

            orderCount: {
              $sum: 1,
            },

            totalRevenue: {
              $sum: "$totalAmount",
            },

            averageOrderValue: {
              $avg: "$totalAmount",
            },
          },
        },
        {
          $sort: {
            totalRevenue: -1,
          },
        },
      ])
      .toArray();

    console.table(result13);


    // ==========================================
    // 14. Orders by Payment Method
    // ==========================================

    console.log("\n14. Orders by Payment Method");

    const result14 = await orders
      .aggregate([
        {
          $group: {
            _id: "$paymentMethod",

            orders: {
              $sum: 1,
            },

            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
        {
          $sort: {
            totalRevenue: -1,
          },
        },
      ])
      .toArray();

    console.table(result14);


    // ==========================================
    // 15. Users Who Spent the Most
    // ==========================================

    console.log("\n15. Users Who Spent the Most");

    const result15 = await orders
      .aggregate([
        // Join orders with users
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },

        // Convert user array into object
        {
          $unwind: "$user",
        },

        // Group orders by user
        {
          $group: {
            _id: "$user._id",

            userName: {
              $first: "$user.name",
            },

            email: {
              $first: "$user.email",
            },

            numberOfOrders: {
              $sum: 1,
            },

            totalSpending: {
              $sum: "$totalAmount",
            },

            averageOrderValue: {
              $avg: "$totalAmount",
            },
          },
        },

        // Highest spending first
        {
          $sort: {
            totalSpending: -1,
          },
        },

        {
          $limit: 20,
        },
      ])
      .toArray();

    console.table(result15);

    console.log("\nAll 15 aggregation queries completed!");
  } catch (error) {
    console.error("Aggregation failed:", error);
  } finally {
    await client.close();
  }
}

runAggregations();