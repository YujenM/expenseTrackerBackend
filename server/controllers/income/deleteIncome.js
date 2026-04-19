const incomeService = require("../../service/income");

module.exports = async (req, res, next) => {
  try {
    const response = await incomeService.deleteIncome({
      id: req.params.id,
    });
    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
