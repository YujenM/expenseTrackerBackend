const incomeServices = require("../../service/income");

module.exports = async (req, res, next) => {
  try {
    const { page, limit, date, search } = req.query;
    const response = await incomeServices.getIncome({
      user_Id: req.decoded.id,
      page,
      limit,
      date,
      search
    });

    res.status(200).json({
      income: response,
    });
  } catch (err) {
    next(err);
  }
};
