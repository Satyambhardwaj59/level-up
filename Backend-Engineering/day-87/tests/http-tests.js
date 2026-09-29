const BASE_URL = "http://localhost:5000";

let passed = 0;
let failed = 0;

const test = async (name, callback) => {
  try {
    await callback();

    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ FAIL: ${name}`);
    console.log(`   ${error.message}`);

    failed++;
  }
};

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const request = async (
  path,
  options = {}
) => {
  const response = await fetch(
    `${BASE_URL}${path}`,
    options
  );

  let data = null;

  const contentType =
    response.headers.get("content-type");

  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    data = await response.json();
  }

  return {
    response,
    data
  };
};

/*
|--------------------------------------------------------------------------
| Tests
|--------------------------------------------------------------------------
*/

console.log(`
========================================
        DAY 87 HTTP TEST SUITE
========================================
`);

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

await test("Health check returns 200", async () => {
  const { response, data } =
    await request("/health");

  assert(
    response.status === 200,
    `Expected 200, received ${response.status}`
  );

  assert(
    data.success === true,
    "Expected success=true"
  );
});

/*
|--------------------------------------------------------------------------
| Request ID
|--------------------------------------------------------------------------
*/

await test("Server generates request ID", async () => {
  const { response } =
    await request("/health");

  const requestId =
    response.headers.get("x-request-id");

  assert(
    requestId,
    "X-Request-ID header is missing"
  );
});

/*
|--------------------------------------------------------------------------
| Custom Request ID
|--------------------------------------------------------------------------
*/

await test(
  "Server preserves custom request ID",
  async () => {
    const { response, data } =
      await request("/health", {
        headers: {
          "X-Request-ID": "test-123"
        }
      });

    const requestId =
      response.headers.get("x-request-id");

    assert(
      requestId === "test-123",
      `Expected test-123, received ${requestId}`
    );

    assert(
      data.requestId === "test-123",
      "Response request ID mismatch"
    );
  }
);

/*
|--------------------------------------------------------------------------
| HTTP Inspection
|--------------------------------------------------------------------------
*/

await test(
  "HTTP inspection returns request details",
  async () => {
    const { response, data } =
      await request(
        "/api/inspect?name=satyam"
      );

    assert(
      response.status === 200,
      `Expected 200, received ${response.status}`
    );

    assert(
      data.data.method === "GET",
      "Method should be GET"
    );

    assert(
      data.data.query.name === "satyam",
      "Query parameter not parsed"
    );

    assert(
      data.data.requestId,
      "Request ID missing"
    );
  }
);

/*
|--------------------------------------------------------------------------
| GET Users
|--------------------------------------------------------------------------
*/

await test(
  "GET /api/users returns users",
  async () => {
    const { response, data } =
      await request("/api/users");

    assert(
      response.status === 200,
      `Expected 200, received ${response.status}`
    );

    assert(
      Array.isArray(data.data.users),
      "Users should be an array"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Query Parameters
|--------------------------------------------------------------------------
*/

await test(
  "GET /api/users supports query parameters",
  async () => {
    const { response, data } =
      await request(
        "/api/users?name=Satyam"
      );

    assert(
      response.status === 200,
      `Expected 200, received ${response.status}`
    );

    assert(
      data.data.users.length >= 1,
      "Expected at least one matching user"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

let createdUserId;

await test(
  "POST /api/users creates a user",
  async () => {
    const { response, data } =
      await request("/api/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          role: "developer"
        })
      });

    assert(
      response.status === 201,
      `Expected 201, received ${response.status}`
    );

    assert(
      data.success === true,
      "Expected success=true"
    );

    assert(
      data.data.email ===
        "test@example.com",
      "Email mismatch"
    );

    createdUserId = data.data.id;
  }
);

/*
|--------------------------------------------------------------------------
| Get Created User
|--------------------------------------------------------------------------
*/

await test(
  "GET /api/users/:id returns user",
  async () => {
    const { response, data } =
      await request(
        `/api/users/${createdUserId}`
      );

    assert(
      response.status === 200,
      `Expected 200, received ${response.status}`
    );

    assert(
      data.data.id === createdUserId,
      "User ID mismatch"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

await test(
  "PATCH /api/users/:id updates user",
  async () => {
    const { response, data } =
      await request(
        `/api/users/${createdUserId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: "Updated User"
          })
        }
      );

    assert(
      response.status === 200,
      `Expected 200, received ${response.status}`
    );

    assert(
      data.data.name === "Updated User",
      "User name was not updated"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Validation Error
|--------------------------------------------------------------------------
*/

await test(
  "POST /api/users rejects invalid email",
  async () => {
    const { response, data } =
      await request("/api/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: "Invalid User",
          email: "invalid-email"
        })
      });

    assert(
      response.status === 400,
      `Expected 400, received ${response.status}`
    );

    assert(
      data.error.code ===
        "INVALID_EMAIL",
      "Expected INVALID_EMAIL"
    );
  }
);

/*
|--------------------------------------------------------------------------
| 404 User
|--------------------------------------------------------------------------
*/

await test(
  "GET missing user returns 404",
  async () => {
    const { response, data } =
      await request(
        "/api/users/does-not-exist"
      );

    assert(
      response.status === 404,
      `Expected 404, received ${response.status}`
    );

    assert(
      data.error.code ===
        "USER_NOT_FOUND",
      "Expected USER_NOT_FOUND"
    );
  }
);

/*
|--------------------------------------------------------------------------
| 404 Route
|--------------------------------------------------------------------------
*/

await test(
  "Unknown route returns 404",
  async () => {
    const { response, data } =
      await request(
        "/api/does-not-exist"
      );

    assert(
      response.status === 404,
      `Expected 404, received ${response.status}`
    );

    assert(
      data.error.code ===
        "ROUTE_NOT_FOUND",
      "Expected ROUTE_NOT_FOUND"
    );
  }
);

/*
|--------------------------------------------------------------------------
| 405 Method
|--------------------------------------------------------------------------
*/

await test(
  "Unsupported user route method returns 405",
  async () => {
    const { response, data } =
      await request("/api/users", {
        method: "PUT"
      });

    assert(
      response.status === 405,
      `Expected 405, received ${response.status}`
    );

    assert(
      data.error.code ===
        "METHOD_NOT_ALLOWED",
      "Expected METHOD_NOT_ALLOWED"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Body Inspection
|--------------------------------------------------------------------------
*/

await test(
  "POST body inspection works",
  async () => {
    const { response, data } =
      await request(
        "/api/inspect/body",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: "Satyam",
            role: "Developer"
          })
        }
      );

    assert(
      response.status === 200,
      `Expected 200, received ${response.status}`
    );

    assert(
      data.data.body.name ===
        "Satyam",
      "Body name mismatch"
    );

    assert(
      data.data.body.role ===
        "Developer",
      "Body role mismatch"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Malformed JSON
|--------------------------------------------------------------------------
*/

await test(
  "Malformed JSON returns 400",
  async () => {
    const { response, data } =
      await request(
        "/api/inspect/body",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: '{"name": "Satyam"'
        }
      );

    assert(
      response.status === 400,
      `Expected 400, received ${response.status}`
    );

    assert(
      data.error.code ===
        "INVALID_JSON",
      "Expected INVALID_JSON"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Intentional 500
|--------------------------------------------------------------------------
*/

await test(
  "Server error returns 500",
  async () => {
    const { response, data } =
      await request("/api/error");

    assert(
      response.status === 500,
      `Expected 500, received ${response.status}`
    );

    assert(
      data.error.code ===
        "INTERNAL_SERVER_ERROR",
      "Expected INTERNAL_SERVER_ERROR"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

await test(
  "DELETE /api/users/:id returns 204",
  async () => {
    const { response } =
      await request(
        `/api/users/${createdUserId}`,
        {
          method: "DELETE"
        }
      );

    assert(
      response.status === 204,
      `Expected 204, received ${response.status}`
    );
  }
);

/*
|--------------------------------------------------------------------------
| Verify Deleted User
|--------------------------------------------------------------------------
*/

await test(
  "Deleted user cannot be fetched",
  async () => {
    const { response, data } =
      await request(
        `/api/users/${createdUserId}`
      );

    assert(
      response.status === 404,
      `Expected 404, received ${response.status}`
    );

    assert(
      data.error.code ===
        "USER_NOT_FOUND",
      "Expected USER_NOT_FOUND"
    );
  }
);

/*
|--------------------------------------------------------------------------
| Results
|--------------------------------------------------------------------------
*/

console.log(`
========================================
             TEST RESULTS
========================================

Passed: ${passed}
Failed: ${failed}

========================================
`);

if (failed > 0) {
  process.exit(1);
}

process.exit(0);