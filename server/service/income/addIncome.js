const { Income, Account } = require("../../models");

module.exports = async (createObj) => {
  const newIncome = await Income.create(createObj);
  const account = await Account.findByPk(createObj.account_id);
  await account.increment("balance", { by: createObj.amount });
  return newIncome;
};
