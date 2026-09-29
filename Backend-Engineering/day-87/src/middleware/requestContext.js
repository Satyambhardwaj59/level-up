import { randomUUID } from "crypto";

const requestContext = (req, res, next) => {
  const incomingRequestId = req.get("X-Request-ID");

  const requestId = incomingRequestId?.trim() || randomUUID();

  req.requestId = requestId;

  res.setHeader("X-Request-ID", requestId);

  next();
};

export default requestContext;