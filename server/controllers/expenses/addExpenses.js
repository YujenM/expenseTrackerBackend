const expenseController = require("../../service/expenses");

module.exports = async (req, res, next) => {
  try {
    const { account_id, category_id, amount, description } = req.body;
    const user_id = req.decoded.id;
    await expenseController.addExpense({
      user_id,
      account_id,
      category_id,
      amount,
      description,
    });
    res.status(200).json({
      message: "expense added",
    });
  } catch (err) {
    next(err);
  }
};
