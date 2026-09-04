const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "ecommerce";

const client = new MongoClient(MONGO_URI);

async function runQueries() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const products = db.collection("products");

    console.log("Connected to MongoDB\n");
   
    // QUERY 1
    // Find products by category
    console.log("QUERY 1");

    await products
      .find({
        category: "Electronics",
      })
      .explain("executionStats");

    const result1 = await products
      .find({
        category: "Electronics",
      })
      .explain("executionStats");

    printStats(result1);

    // QUERY 2
    // Find products by price
    console.log("\nQUERY 2");

    const result2 = await products
      .find({
        price: {
          $lt: 5000,
        },
      })
      .explain("executionStats");

    printStats(result2);

    // QUERY 3
    // Find highly rated products
    console.log("\nQUERY 3");

    const result3 = await products
      .find({
        rating: {
          $gte: 4.5,
        },
      })
      .explain("executionStats");

    printStats(result3);
   
    // QUERY 4
    // Category + Price
    console.log("\nQUERY 4");

    const result4 = await products
      .find({
        category: "Electronics",
        price: {
          $lt: 50000,
        },
      })
      .explain("executionStats");

    printStats(result4);
   
    // QUERY 5
    // Find by brand
    console.log("\nQUERY 5");

    const result5 = await products
      .find({
        brand: "Apple",
      })
      .explain("executionStats");

    printStats(result5);

    // QUERY 6
    // Sort by rating
    console.log("\nQUERY 6");

    const result6 = await products
      .find({
        category: "Electronics",
      })
      .sort({
        rating: -1,
      })
      .limit(20)
      .explain("executionStats");

    printStats(result6);

    // QUERY 7
    // Available products with stock
    console.log("\nQUERY 7");

    const result7 = await products
      .find({
        isAvailable: true,
        stock: {
          $gt: 0,
        },
      })
      .explain("executionStats");

    printStats(result7);

    // QUERY 8
    // Search product name
    console.log("\nQUERY 8");

    const result8 = await products
      .find({
        name: /Apple Product/,
      })
      .explain("executionStats");

    printStats(result8);

    // QUERY 9
    // Large price range
    console.log("\nQUERY 9");

    const result9 = await products
      .find({
        price: {
          $gte: 10000,
          $lte: 50000,
        },
      })
      .explain("executionStats");

    printStats(result9);
   
    // QUERY 10
    // Category + price + sorting
    console.log("\nQUERY 10");

    const result10 = await products
      .find({
        category: "Electronics",
        price: {
          $lt: 50000,
        },
      })
      .sort({
        price: 1,
      })
      .limit(20)
      .explain("executionStats");

    printStats(result10);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

function printStats(result) {
  const stats = result.executionStats;

  console.log("Execution Time:", stats.executionTimeMillis, "ms");

  console.log(
    "Documents Examined:",
    stats.totalDocsExamined
  );

  console.log(
    "Documents Returned:",
    stats.nReturned
  );

  console.log(
    "Keys Examined:",
    stats.totalKeysExamined
  );

  console.log(
    "Winning Plan:",
    result.queryPlanner.winningPlan.stage
  );
}

runQueries();

 