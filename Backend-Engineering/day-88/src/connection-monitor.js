import net from "node:net";

const PORT = 4000;

const server = net.createServer(
    (socket) => {

        console.log("\nTCP CONNECTION");

        console.log(
            "Remote Address:",
            socket.remoteAddress
        );

        console.log(
            "Remote Port:",
            socket.remotePort
        );

        console.log(
            "Local Port:",
            socket.localPort
        );

        socket.on("data", (data) => {

            console.log(
                "Received bytes:",
                data.length
            );
        });

        socket.on("close", () => {

            console.log(
                "TCP connection closed"
            );
        });
    }
);

server.listen(PORT, () => {

    console.log(
        `TCP monitor listening on ${PORT}`
    );
});