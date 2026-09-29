const requestLogger = (req, res, next) => {
  const startTime = process.hrtime.bigint();

  console.log(`
┌────────────────────────────────────────
│ REQUEST
├────────────────────────────────────────
│ Method      : ${req.method}
│ URL         : ${req.originalUrl}
│ User-Agent  : ${req.get("user-agent") || "unknown"}
│ Content-Type: ${req.get("content-type") || "none"}
│ Request-ID  : ${req.requestId || "pending"}
└────────────────────────────────────────
  `);

  res.on("finish", () => {
    const endTime = process.hrtime.bigint();

    const durationMs =
      Number(endTime - startTime) / 1_000_000;

    const duration = `${durationMs.toFixed(2)}ms`;

    res.setHeader("X-Response-Time", duration);

    console.log(`
┌────────────────────────────────────────
│ RESPONSE
├────────────────────────────────────────
│ Method      : ${req.method}
│ URL         : ${req.originalUrl}
│ Status      : ${res.statusCode}
│ Duration    : ${duration}
│ Request-ID  : ${req.requestId}
└────────────────────────────────────────
    `);
  });

  next();
};

export default requestLogger;