const { Account } = require("../../models");
const validationError = require("../../errors");

module.exports = async (createObj) => {
  try {
    const checkAccount = await Account.findAll({
      where: {
        user_id: createObj.user_id,
        provider_id: createObj.provider_id,
      },
    });

    if (checkAccount.length > 0) {
      throw new validationError("Account already exists");
    }

    const newAccount = await Account.create(createObj);
    return newAccount;
  } catch (err) {
    throw err;
  }
};
