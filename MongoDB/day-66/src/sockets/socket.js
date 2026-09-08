const { Server } = require("socket.io");

const {
  setSocketIO,
} = require("../services/notificationService");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL ||
        "http://localhost:5173",
      methods: ["GET", "POST", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "🔌 Client connected:",
      socket.id
    );

    socket.on("join-admin", () => {
      socket.join("admins");

      console.log(
        `👨‍💼 ${socket.id} joined admin room`
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "🔌 Client disconnected:",
        socket.id
      );
    });
  });

  setSocketIO(io);

  return io;
};

module.exports = initializeSocket;