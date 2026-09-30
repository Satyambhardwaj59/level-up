import http from "node:http";

const tests = [
    "/health",
    "/users",
    "/slow",
    "/large-response"
];

function request(path) {

    return new Promise((resolve, reject) => {

        const start = performance.now();

        http.get(
            `http://localhost:3000${path}`,
            (res) => {

                let size = 0;

                res.on("data", (chunk) => {
                    size += chunk.length;
                });

                res.on("end", () => {

                    const duration =
                        performance.now() -
                        start;

                    resolve({
                        path,
                        status:
                            res.statusCode,
                        bytes: size,
                        duration:
                            `${duration.toFixed(2)} ms`
                    });
                });
            }
        ).on("error", reject);
    });
}

for (const path of tests) {

    const result =
        await request(path);

    console.log(result);
}