const accountService = require("../../service/account");

module.exports = async (req, res, next) => {
  try {
    const { provider_id, account_name, balance } = req.body;
    const newAccount = await accountService.createAccount({
      user_id: req.decoded.id,
      provider_id,
      account_name,
      balance,
    });
    res.status(201).json({
      status: "success",
      account: newAccount,
    });
  } catch (error) {
    console.error("REAL ERROR:", error.message);
    next(error);
  }
};
