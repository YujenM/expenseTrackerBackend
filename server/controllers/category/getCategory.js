const categoryServices = require("../../service/category");
const validationError = require("../../errors");
module.exports = async (req, res, next) => {
  try {
    const acceptableCategory = ["income", "expense", "savings", "loan"];
    const type = req.query.type?.trim();
    if (!acceptableCategory.includes(type)) {
      throw new validationError("Invalid category type");
    }
    const category = await categoryServices.getCategory({ type });
    res.status(200).json({
      category,
    });
  } catch (error) {
    next(error);
  }
};
