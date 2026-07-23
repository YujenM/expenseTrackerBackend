const expenseService = require("../../service/expenses");

module.exports = async (req, res, next) => {
  try {
    const { page, limit, date, search } = req.query;
    userId = req.decoded.id;
    const response = await expenseService.getExpenseTable({
      userId: userId,
      page,
      limit,
      date,
      search,
    });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
