const BASE_URL =
  "http://localhost:5000/api";


async function request(
  path,
  options = {}
) {
  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    }
  );

  const data = await response.json();

  console.log(
    `\n${options.method || "GET"} ${path}`
  );

  console.log(
    "Status:",
    response.status
  );

  console.dir(data, {
    depth: null
  });

  return data;
}


await request("/health");


await request("/users");


await request("/users/1");


await request("/products?limit=5");


await request("/products/1");


await request(
  "/products/search/metadata",
  {
    method: "POST",

    body: JSON.stringify({
      brand: "Lenovo"
    })
  }
);


await request(
  "/orders/checkout",
  {
    method: "POST",

    body: JSON.stringify({
      userId: 1,
      productId: 1,
      quantity: 1
    })
  }
);


await request("/orders/1");


await request(
  "/analytics/dashboard"
);


await request(
  "/analytics/top-products"
);