export function errorHandler(
  error,
  req,
  res,
  next
) {
  console.error(error);

  if (error.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Duplicate value"
    });
  }

  if (error.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Referenced record does not exist"
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message:
      error.message || "Internal server error"
  });
}