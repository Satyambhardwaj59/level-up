import http from "node:http";

const TOTAL_REQUESTS = 100;

const keepAlive =
    process.argv[2] === "on";

const agent = new http.Agent({
    keepAlive
});

let completed = 0;
let totalLatency = 0;

const sockets = new Set();

const start = performance.now();

function makeRequest() {

    const requestStart = performance.now();

    const req = http.get(
        {
            hostname: "localhost",
            port: 3000,
            path: "/health",
            agent
        },
        (res) => {

            res.on("data", () => {});

            res.on("end", () => {

                const latency =
                    performance.now() -
                    requestStart;

                totalLatency += latency;

                completed++;

                if (completed === TOTAL_REQUESTS) {

                    const totalTime =
                        performance.now() -
                        start;

                    console.log("\n======================");
                    console.log("HTTP/1.1 EXPERIMENT");
                    console.log("======================");

                    console.log(
                        "Keep-Alive:",
                        keepAlive
                    );

                    console.log(
                        "Requests:",
                        TOTAL_REQUESTS
                    );

                    console.log(
                        "Connections:",
                        sockets.size
                    );

                    console.log(
                        "Total Time:",
                        `${totalTime.toFixed(2)} ms`
                    );

                    console.log(
                        "Average Latency:",
                        `${(
                            totalLatency /
                            TOTAL_REQUESTS
                        ).toFixed(2)} ms`
                    );

                    agent.destroy();
                }
            });
        }
    );

    req.on("socket", (socket) => {

        sockets.add(socket);
    });

    req.on("error", console.error);
}


for (
    let i = 0;
    i < TOTAL_REQUESTS;
    i++
) {
    makeRequest();
}