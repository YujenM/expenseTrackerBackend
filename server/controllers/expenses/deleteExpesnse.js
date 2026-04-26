const expenseService = require("../../service/expenses");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    await expenseService.deleteExpense({
      expenseId: req.params.expenseId,
      userId: userId,
    });

    res.status(200).json({
      message: "expense deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
