import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 3002;

const server = http.createServer(
    (req, res) => {

        if (req.url !== "/download") {

            res.writeHead(404);
            return res.end("Not Found");
        }

        const filePath =
            path.resolve("large-file.txt");

        const start =
            process.hrtime.bigint();

        const stream =
            fs.createReadStream(filePath);

        stream.on("open", () => {

            console.log(
                "File stream opened"
            );
        });

        stream.on("error", (error) => {

            console.error(error);

            if (!res.headersSent) {
                res.writeHead(500);
            }

            res.end("File error");
        });

        stream.on("end", () => {

            const end =
                process.hrtime.bigint();

            const duration =
                Number(end - start) /
                1_000_000;

            console.log(
                `Download completed in ${duration.toFixed(2)} ms`
            );
        });

        res.writeHead(200, {
            "Content-Type":
                "application/octet-stream"
        });

        stream.pipe(res);
    }
);

server.listen(PORT, () => {

    console.log(
        `Streaming server running on ${PORT}`
    );
});