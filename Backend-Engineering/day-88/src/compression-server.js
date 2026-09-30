import http from "node:http";
import zlib from "node:zlib";

const PORT = 3003;

const data = Array.from(
    { length: 10000 },
    (_, i) => ({
        id: i,
        message:
            "Compression experiment data ".repeat(10)
    })
);

const body = JSON.stringify(data);

const server = http.createServer(
    (req, res) => {

        if (req.url !== "/compressed") {

            res.writeHead(404);
            return res.end("Not Found");
        }

        const encoding =
            req.headers["accept-encoding"] || "";

        console.log(
            "Accept-Encoding:",
            encoding
        );

        // -------------------
        // Brotli
        // -------------------

        if (encoding.includes("br")) {

            const start = performance.now();

            zlib.brotliCompress(
                Buffer.from(body),
                (error, compressed) => {

                    if (error) {
                        res.writeHead(500);
                        return res.end();
                    }

                    const duration =
                        performance.now() - start;

                    res.writeHead(200, {
                        "Content-Type":
                            "application/json",
                        "Content-Encoding": "br",
                        "Content-Length":
                            compressed.length
                    });

                    console.log({
                        encoding: "br",
                        original:
                            Buffer.byteLength(body),
                        compressed:
                            compressed.length,
                        time:
                            `${duration.toFixed(2)} ms`
                    });

                    res.end(compressed);
                }
            );

            return;
        }

        // -------------------
        // gzip
        // -------------------

        if (encoding.includes("gzip")) {

            const start = performance.now();

            zlib.gzip(
                body,
                (error, compressed) => {

                    if (error) {
                        res.writeHead(500);
                        return res.end();
                    }

                    const duration =
                        performance.now() - start;

                    res.writeHead(200, {
                        "Content-Type":
                            "application/json",
                        "Content-Encoding":
                            "gzip",
                        "Content-Length":
                            compressed.length
                    });

                    console.log({
                        encoding: "gzip",
                        original:
                            Buffer.byteLength(body),
                        compressed:
                            compressed.length,
                        time:
                            `${duration.toFixed(2)} ms`
                    });

                    res.end(compressed);
                }
            );

            return;
        }

        // -------------------
        // No compression
        // -------------------

        res.writeHead(200, {
            "Content-Type":
                "application/json",
            "Content-Length":
                Buffer.byteLength(body)
        });

        res.end(body);
    }
);

server.listen(PORT, () => {

    console.log(
        `Compression server running on ${PORT}`
    );
});


// Compression server

/*

PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> 
PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> curl.exe -H "Accept-Encoding: gzip" http://localhost:3003/compressed -o gzip-response.gz
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100  33196 100  33196   0      0 412.2k      0                              0
PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> curl.exe -H "Accept-Encoding: br" http://localhost:3003/compressed -o br-response
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100  14425 100  14425   0      0    871      0   00:16   00:16           2824
PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> curl.exe -H "Accept-Encoding: identity" http://localhost:3003/compressed -o plain-response.json
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100  2.90M 100  2.90M   0      0 14.94M      0                              0
PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> Get-Item gzip-response.gz
>> Get-Item br-response
>> Get-Item plain-response.json


    Directory: E:\DEV-SPACE\level-up\Backend-Engineering\day-88


Mode                 LastWriteTime         Length Name                                     
----                 -------------         ------ ----                                     
-a----        30-09-2026     22:59          33196 gzip-response.gz                         
-a----        30-09-2026     23:00          14425 br-response                              
-a----        30-09-2026     23:00        3048891 plain-response.json                      


PS E:\DEV-SPACE\level-up\Backend-Engineering\day-88> npm run compression

> day-88-production-http-protocol-lab@1.0.0 compression
> node src/compression-server.js

Compression server running on 3003
Accept-Encoding: gzip
{
  encoding: 'gzip',
  original: 3048891,
  compressed: 33196,
  time: '24.99 ms'
}
Accept-Encoding: br
{
  encoding: 'br',
  original: 3048891,
  compressed: 14425,
  time: '16486.72 ms'
}
Accept-Encoding: identity


*/