const { Account } = require("../../models");
const validationError = require("../../errors");

module.exports = async (updateObj) => {
  const account = await Account.findOne({
    where: {
      id: updateObj.account_id,
      user_id: updateObj.user_id,
    },
  });
  if (!account) {
    throw new validationError("Account not found", 300);
  }
  account.balance = updateObj.balance;
  await account.save();
  return account;
};
