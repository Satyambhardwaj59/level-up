const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "ecommerce";

const client = new MongoClient(MONGO_URI);

async function createIndexes() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const products = db.collection("products");

    console.log("Connected to MongoDB");

    // 1. Category index
    await products.createIndex({
      category: 1,
    });

    // 2. Price index
    await products.createIndex({
      price: 1,
    });

    // 3. Rating index
    await products.createIndex({
      rating: -1,
    });

    // 4. Compound index
    await products.createIndex({
      category: 1,
      price: 1,
    });

    // 5. Brand index
    await products.createIndex({
      brand: 1,
    });

    // 6. Availability + stock compound index
    await products.createIndex({
      isAvailable: 1,
      stock: 1,
    });

    console.log("\nIndexes created successfully!");

    const indexes = await products.listIndexes().toArray();

    console.log("\nCurrent indexes:");

    indexes.forEach((index) => {
      console.log(index.name, index.key);
    });
  } catch (error) {
    console.error("Index creation failed:", error);
  } finally {
    await client.close();
  }
}

createIndexes();