const accountService = require("../../service/account");

module.exports = async (req, res, next) => {
  try {
    const response = await accountService.deleteAccount({
      user_id: req.decoded.id,
      account_id: req.params.id,
    });
    res.status(202).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
