const incomeServices = require("../../service/income");

module.exports = async (req, res, next) => {
  try {
    console.log('here',req.decoded.id)
    const response = await incomeServices.getIncome({
      user_Id: req.decoded.id,
    });

    res.status(200).json({
      income: response,
    });
  } catch (err) {
    next(err);
  }
};
