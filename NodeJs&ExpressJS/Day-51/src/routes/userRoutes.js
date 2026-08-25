import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";


export async function userRoutes(
  req,
  res
) {
  const url = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  const pathname = url.pathname;
  const method = req.method;

  // /api/users
  if (pathname === "/api/users") {

    if (method === "GET") {
      req.query = url.searchParams;

      return getAllUsers(
        req,
        res
      );
    }

    if (method === "POST") {
      try {
        const body =
          await parseBody(req);

        return createUser(
          req,
          res,
          body
        );
      } catch (error) {
        return sendError(
          res,
          400,
          "Invalid JSON"
        );
      }
    }
  }


  // /api/users/:id
  const userMatch =
    pathname.match(
      /^\/api\/users\/(\d+)$/
    );

  if (userMatch) {
    req.params = {
      id: userMatch[1]
    };

    if (method === "GET") {
      return getUserById(
        req,
        res
      );
    }

    if (method === "PUT") {
      try {
        const body =
          await parseBody(req);

        return updateUser(
          req,
          res,
          body
        );
      } catch (error) {
        return sendError(
          res,
          400,
          "Invalid JSON"
        );
      }
    }

    if (method === "DELETE") {
      return deleteUser(
        req,
        res
      );
    }
  }

  return false;
}


// Read request body
function parseBody(req) {
  return new Promise(
    (resolve, reject) => {
      let body = "";

      req.on(
        "data",
        (chunk) => {
          body += chunk;
        }
      );

      req.on(
        "end",
        () => {
          if (!body) {
            return resolve({});
          }

          try {
            resolve(
              JSON.parse(body)
            );
          } catch {
            reject(
              new Error(
                "Invalid JSON"
              )
            );
          }
        }
      );

      req.on(
        "error",
        reject
      );
    }
  );
}


function sendError(
  res,
  statusCode,
  message
) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json"
  });

  res.end(
    JSON.stringify({
      success: false,
      message
    })
  );
}