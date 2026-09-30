import http from "node:http";

const PORT = 3000;

const users = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
}));

const server = http.createServer((req, res) => {

    const start = process.hrtime.bigint();
    const socket = req.socket;

    console.log("\n==============================");
    console.log("HTTP/1.1 REQUEST");
    console.log("==============================");

    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("HTTP Version:", req.httpVersion);
    console.log("Socket:", socket.remotePort);
    console.log("Remote:", socket.remoteAddress);
    console.log(
        "Connection:",
        req.headers.connection || "not specified"
    );

    res.on("finish", () => {

        const end = process.hrtime.bigint();

        const duration =
            Number(end - start) / 1_000_000;

        console.log("Status:", res.statusCode);
        console.log(
            "Response Time:",
            `${duration.toFixed(2)} ms`
        );
    });

    // --------------------------
    // /health
    // --------------------------

    if (req.url === "/health") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(
            JSON.stringify({
                status: "ok"
            })
        );
    }

    // --------------------------
    // /users
    // --------------------------

    if (req.url === "/users") {

        const body = JSON.stringify(users);

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        });

        return res.end(body);
    }

    // --------------------------
    // /slow
    // --------------------------

    if (req.url === "/slow") {

        return setTimeout(() => {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(
                JSON.stringify({
                    message: "Slow response",
                    delay: "1000ms"
                })
            );

        }, 1000);
    }

    // --------------------------
    // /large-response
    // --------------------------

    if (req.url === "/large-response") {

        const data = Array.from(
            { length: 100000 },
            (_, i) => ({
                id: i,
                message:
                    "Large HTTP response test data"
            })
        );

        const body = JSON.stringify(data);

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        });

        return res.end(body);
    }

    // --------------------------
    // 404
    // --------------------------

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            error: "Route not found"
        })
    );
});


// TCP connection monitoring

server.on("connection", (socket) => {

    console.log(
        `TCP CONNECTION CREATED → ${socket.remotePort}`
    );

    socket.on("close", () => {

        console.log(
            `TCP CONNECTION CLOSED → ${socket.remotePort}`
        );
    });
});


server.listen(PORT, () => {

    console.log(
        `HTTP/1.1 server running on http://localhost:${PORT}`
    );
});


// Http 1 client and server experiment results

/*

==============================
HTTP/1.1 REQUEST
==============================
Method: GET
URL: /health
HTTP Version: 1.1
Socket: 58095
Remote: ::1
Connection: keep-alive
Status: 200
Response Time: 0.48 ms


PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> node src/http1-client.js off

======================
HTTP/1.1 EXPERIMENT
======================
Keep-Alive: false
Requests: 100
Connections: 100
Total Time: 328.60 ms
Average Latency: 207.01 ms


PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> node src/http1-client.js on

======================
HTTP/1.1 EXPERIMENT
======================
Keep-Alive: true
Requests: 100
Connections: 100
Total Time: 217.91 ms
Average Latency: 145.57 ms

*/