const accountService = require("../../service/account");

module.exports = async (req, res, next) => {
  try {
    const response = await accountService.updateAccount({
      user_id: req.decoded.id,
      account_id: req.params.id,
      balance: req.body.balance,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
