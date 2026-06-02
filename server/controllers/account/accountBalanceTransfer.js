const accountService = require("../../service/account");

module.exports = async (req, res, next) => {
  try {
    const transferObj = {
      fromAccountId: req.body.fromAccountId,
      toAccountId: req.body.toAccountId,
      amount: req.body.amount,
    };

    const response = await accountService.accountBalanceTransfer(transferObj);
    res.status(200).json({ message: "Transfer successful", response });
  } catch (err) {
    next(err);
  }
};
