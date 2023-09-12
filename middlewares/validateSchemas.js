const productSchema = require("../Schemas/product.schemas");
const ExpressError = require("../utils/ExpressError");

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res.json(new ExpressError(msg, 400));
  }
  next();
};
