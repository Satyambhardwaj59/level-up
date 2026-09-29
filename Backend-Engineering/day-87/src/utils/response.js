export const successResponse = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    requestId = null,
    headers = {}
  } = {}
) => {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  return res.status(statusCode).json({
    success: true,
    message,
    data,
    requestId
  });
};

export const errorResponse = (
  res,
  {
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    message = "Something went wrong",
    requestId = null,
    headers = {}
  } = {}
) => {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message
    },
    requestId
  });
};