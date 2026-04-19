const incomeService = require("../../service/income");

module.exports = async (req, res, next) => {
  try {
    const response = await incomeService.createIncome({
      user_id: req.decoded.id,
      ...req.body,
    });
    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (Err) {
    next(Err);
  }
};
