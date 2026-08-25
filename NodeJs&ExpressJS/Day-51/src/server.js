import http from "http";
import { userRoutes } from "./routes/userRoutes.js";

const PORT = 3000;

const server = http.createServer(
  async (req, res) => {

    // CORS
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );


    // Handle preflight
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }


    try {
      const handled =
        await userRoutes(
          req,
          res
        );

      // Route not found
      if (!handled && !res.writableEnded) {
        res.writeHead(404, {
          "Content-Type":
            "application/json"
        });

        res.end(
          JSON.stringify({
            success: false,
            message: "Route not found"
          })
        );
      }

    } catch (error) {
      console.error(error);

      if (!res.writableEnded) {
        res.writeHead(500, {
          "Content-Type":
            "application/json"
        });

        res.end(
          JSON.stringify({
            success: false,
            message:
              "Internal server error"
          })
        );
      }
    }
  }
);


server.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running at http://localhost:${PORT}`
    );
  }
);