const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "ecommerce";

const client = new MongoClient(MONGO_URI);

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports",
  "Gaming",
  "Beauty",
  "Furniture",
];

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Nike",
  "Adidas",
  "Dell",
  "HP",
  "Lenovo",
  "Logitech",
  "Amazon",
];

const tags = [
  "premium",
  "new",
  "sale",
  "popular",
  "trending",
  "wireless",
  "smart",
  "portable",
];

function generateProduct(index) {
  const category =
    categories[Math.floor(Math.random() * categories.length)];

  const brand =
    brands[Math.floor(Math.random() * brands.length)];

  const productTags = [
    tags[Math.floor(Math.random() * tags.length)],
    tags[Math.floor(Math.random() * tags.length)],
  ];

  return {
    name: `${brand} Product ${index}`,
    price: Math.floor(Math.random() * 100000) + 500,
    category,
    brand,
    stock: Math.floor(Math.random() * 500),
    rating: Number((Math.random() * 4 + 1).toFixed(1)),
    tags: [...new Set(productTags)],
    description: `High quality ${category.toLowerCase()} product from ${brand}`,
    isAvailable: Math.random() > 0.1,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    ),
  };
}

async function seedDatabase() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const products = db.collection("products");

    console.log("Connected to MongoDB");

    // Remove old performance-test data
    await products.deleteMany({
      performanceTest: true,
    });

    const TOTAL_PRODUCTS = 100000;
    const BATCH_SIZE = 5000;

    console.log(`Generating ${TOTAL_PRODUCTS} products...`);

    for (let start = 0; start < TOTAL_PRODUCTS; start += BATCH_SIZE) {
      const batch = [];

      const end = Math.min(
        start + BATCH_SIZE,
        TOTAL_PRODUCTS
      );

      for (let i = start; i < end; i++) {
        const product = generateProduct(i + 1);

        product.performanceTest = true;

        batch.push(product);
      }

      await products.insertMany(batch);

      console.log(
        `Inserted ${end}/${TOTAL_PRODUCTS} products`
      );
    }

    const count = await products.countDocuments({
      performanceTest: true,
    });

    console.log(`\nSuccessfully inserted ${count} products`);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();