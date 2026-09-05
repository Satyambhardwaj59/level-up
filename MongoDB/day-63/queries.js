const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "ecommerce";

const client = new MongoClient(MONGO_URI);

async function runFacetQuery() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const products = db.collection("products");

    const page = 1;
    const limit = 20;

    const result = await products
      .aggregate([
        // =====================================
        // Common filter
        // =====================================

        {
          $match: {
            performanceTest: true,
          },
        },

        // =====================================
        // Multiple operations in parallel
        // =====================================

        {
          $facet: {
            // -------------------------------
            // Total products
            // -------------------------------

            totalProducts: [
              {
                $count: "count",
              },
            ],

            // -------------------------------
            // Products by category
            // -------------------------------

            productsByCategory: [
              {
                $group: {
                  _id: "$category",

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
            ],

            // -------------------------------
            // Average price
            // -------------------------------

            averagePrice: [
              {
                $group: {
                  _id: null,

                  value: {
                    $avg: "$price",
                  },
                },
              },
            ],

            // -------------------------------
            // Price ranges
            // -------------------------------

            priceRanges: [
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
                  ],

                  default: "100000+",

                  output: {
                    count: {
                      $sum: 1,
                    },
                  },
                },
              },
            ],

            // -------------------------------
            // Top brands
            // -------------------------------

            topBrands: [
              {
                $group: {
                  _id: "$brand",

                  count: {
                    $sum: 1,
                  },

                  averagePrice: {
                    $avg: "$price",
                  },
                },
              },

              {
                $sort: {
                  count: -1,
                },
              },

              {
                $limit: 10,
              },
            ],

            // -------------------------------
            // Paginated products
            // -------------------------------

            paginatedProducts: [
              {
                $sort: {
                  createdAt: -1,
                },
              },

              {
                $skip: (page - 1) * limit,
              },

              {
                $limit: limit,
              },

              {
                $project: {
                  _id: 1,
                  name: 1,
                  price: 1,
                  category: 1,
                  brand: 1,
                  rating: 1,
                  stock: 1,
                },
              },
            ],
          },
        },
      ])
      .toArray();

    console.dir(result[0], {
      depth: null,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

runFacetQuery();
