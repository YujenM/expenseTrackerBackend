const expenseService = require("../../service/expenses");

module.exports = async (req, res, next) => {
  try {
    const { page, limit, date, search } = req.query;
    userId = req.decoded.id;
    const response = await expenseService.getExpense({
      userId: userId,
      page,
      limit,
      date,
      search
    });
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
