const accountService = require("../../service/account");

module.exports = async (req, res, next) => {
  try {
    const user_id = req.decoded.id;
    const response = await accountService.listAccount({
      user_id,
    });
    res.status(200).json({
      message: "Accounts retrieved successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
