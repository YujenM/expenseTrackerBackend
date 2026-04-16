const accountService = require("../../service/account");

module.exports = async (req, res, next) => {
  try {
    const providers = await accountService.getProvider();
    res.status(200).json(providers);
  } catch (error) {
    next(error);
  }
};
