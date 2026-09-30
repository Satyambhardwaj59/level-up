import http2 from "node:http2";

const client =
    http2.connect("http://localhost:3001");

const paths = [
    "/api/users",
    "/api/products",
    "/api/orders",
    "/api/dashboard"
];

const start = performance.now();

let completed = 0;

for (const path of paths) {

    const requestStart =
        performance.now();

    const req = client.request({
        ":method": "GET",
        ":path": path
    });

    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {

        const duration =
            performance.now() -
            requestStart;

        console.log({
            path,
            duration:
                `${duration.toFixed(2)} ms`,
            body
        });

        completed++;

        if (completed === paths.length) {

            console.log(
                `Total Time: ${(
                    performance.now() -
                    start
                ).toFixed(2)} ms`
            );

            client.close();
        }
    });

    req.end();
}