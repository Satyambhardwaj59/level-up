export function errorHandler(
  err,
  req,
  res,
  next
) {
  console.error(err);

  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack
    })
  });
}