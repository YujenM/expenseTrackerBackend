const {Account} = require("../../models");

module.exports = async (deleteObj) => {
  const account = await Account.findOne({
    where: {
      id: deleteObj.account_id,
      user_id: deleteObj.user_id,
    },
  });
  if (!account) {
    throw new Error("Account not found");
  }
  account.active = false;
  await account.save();
  return account;

};
