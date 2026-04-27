const expenseService = require("../../service/expenses");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const response = await expenseService.updateExpense({
      expenseId: req.params.expenseId,
      accountId: req.body.accountId,
      userId: userId,
      amount: req.body.amount,
      description: req.body.description,
      expense_date: req.body.expense_date,
    });

    res.status(200).json({
      message: "expenses updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
