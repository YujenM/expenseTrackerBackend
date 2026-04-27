const expenseService = require("../../service/expenses");

module.exports = async (req, res, next) => {
  try {
    userId = req.decoded.id;
    const response = await expenseService.getExpenseBycategory({
      userId: userId,
    });
    res.status(200).json({
      message:"success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
