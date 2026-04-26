const expenseService = require("../../service/expenses");
module.exports = async (req, res, next) => {
  try {
    const response = await expenseService.monthlyBudget({
      userId: req.decoded.id,
      amount: req.body,
    });
    res.status(200).json({
      message: "monthly Budget added",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
