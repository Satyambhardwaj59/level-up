import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║     HTTP INSPECTION SERVER          ║
╠══════════════════════════════════════╣
║ Environment : ${process.env.NODE_ENV || "development"}        ║
║ Port        : ${PORT}                   ║
║ URL         : http://localhost:${PORT} ║
╚══════════════════════════════════════╝
  `);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received. Shutting down...");

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});