export function validateUser(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "name and email are required"
    });
  }

  next();
}


export function validateCheckout(
  req,
  res,
  next
) {
  const {
    userId,
    productId,
    quantity
  } = req.body;

  if (
    !Number.isInteger(Number(userId)) ||
    !Number.isInteger(Number(productId)) ||
    !Number.isInteger(Number(quantity))
  ) {
    return res.status(400).json({
      success: false,
      message:
        "userId, productId and quantity must be integers"
    });
  }

  if (Number(quantity) <= 0) {
    return res.status(400).json({
      success: false,
      message:
        "quantity must be greater than zero"
    });
  }

  next();
}