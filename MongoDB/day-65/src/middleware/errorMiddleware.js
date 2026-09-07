const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error("ERROR:", err.message);

  res.status(400).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorMiddleware;