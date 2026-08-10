const savingService = require("../../service/savings");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const response = await savingService.getSavingOverview(userId);
    res.status(200).json({
      message: "Successfully retrieved saving overview",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
