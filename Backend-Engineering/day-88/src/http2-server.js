import http2 from "node:http2";

const PORT = 3001;

const server =
    http2.createServer();

server.on("stream", (stream, headers) => {

    const start =
        process.hrtime.bigint();

    const path = headers[":path"];
    const method = headers[":method"];

    console.log("\n======================");
    console.log("HTTP/2 STREAM");
    console.log("======================");

    console.log("Method:", method);
    console.log("Path:", path);
    console.log("Stream ID:", stream.id);

    let data;

    if (path === "/api/users") {

        data = {
            endpoint: "users",
            users: [
                { id: 1, name: "Rahul" },
                { id: 2, name: "Amit" },
                { id: 3, name: "Priya" }
            ]
        };

    } else if (path === "/api/products") {

        data = {
            endpoint: "products",
            products: [
                { id: 1, name: "Laptop" },
                { id: 2, name: "Mouse" }
            ]
        };

    } else if (path === "/api/orders") {

        data = {
            endpoint: "orders",
            orders: [
                { id: 101, total: 50000 },
                { id: 102, total: 25000 }
            ]
        };

    } else if (path === "/api/dashboard") {

        data = {
            users: 1000,
            products: 500,
            orders: 2500,
            revenue: 5000000
        };

    } else {

        stream.respond({
            ":status": 404,
            "content-type":
                "application/json"
        });

        return stream.end(
            JSON.stringify({
                error: "Not Found"
            })
        );
    }

    const body = JSON.stringify(data);

    stream.respond({
        ":status": 200,
        "content-type":
            "application/json"
    });

    stream.end(body);

    stream.on("close", () => {

        const end =
            process.hrtime.bigint();

        const duration =
            Number(end - start) /
            1_000_000;

        console.log(
            `Stream ${stream.id} completed`
        );

        console.log(
            `Duration: ${duration.toFixed(2)} ms`
        );
    });
});

server.listen(PORT, () => {

    console.log(
        `HTTP/2 server running on port ${PORT}`
    );
});



// Http v2 client and server results

/*

PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> npm run http2

> day-88-production-http-protocol-lab@1.0.0 http2
> node src/http2-server.js

HTTP/2 server running on port 3001

======================
HTTP/2 STREAM
======================
Method: GET
Path: /api/users
Stream ID: 1

======================
HTTP/2 STREAM
======================
Method: GET
Path: /api/products
Stream ID: 3

======================
HTTP/2 STREAM
======================
Method: GET
Path: /api/orders
Stream ID: 5

======================
HTTP/2 STREAM
======================
Method: GET
Path: /api/dashboard
Stream ID: 7
Stream 1 completed
Duration: 14.12 ms
Stream 3 completed
Duration: 8.43 ms
Stream 5 completed
Duration: 6.83 ms
Stream 7 completed
Duration: 5.77 ms


PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> npm run http2-client

> day-88-production-http-protocol-lab@1.0.0 http2-client
> node src/http2-client.js

{
  path: '/api/users',
  duration: '31.09 ms',
  body: '{"endpoint":"users","users":[{"id":1,"name":"Rahul"},{"id":2,"name":"Amit"},{"id":3,"name":"Priya"}]}'
}
{
  path: '/api/products',
  duration: '32.78 ms',
  body: '{"endpoint":"products","products":[{"id":1,"name":"Laptop"},{"id":2,"name":"Mouse"}]}'
}
{
  path: '/api/orders',
  duration: '33.28 ms',
  body: '{"endpoint":"orders","orders":[{"id":101,"total":50000},{"id":102,"total":25000}]}'
}
{
  path: '/api/dashboard',
  duration: '33.78 ms',
  body: '{"users":1000,"products":500,"orders":2500,"revenue":5000000}'
}
Total Time: 37.86 ms
PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> 


*/