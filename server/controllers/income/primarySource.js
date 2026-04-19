const incomeService = require("../../service/income");

module.exports = async (req, res, next) => {
  try {
    const response = await incomeService.primarySource({
      user_id: req.decoded.id,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
