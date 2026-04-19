const { Income, Account, sequelize } = require("../../models");

module.exports = async (updateObj) => {
  return await sequelize.transaction(async (t) => {
    const oldIncome = await Income.findByPk(updateObj.id, { transaction: t });
    const account = await Account.findByPk(oldIncome.account_id, {
      transaction: t,
    });

    await account.decrement("balance", {
      by: oldIncome.amount,
      transaction: t,
    });
    await account.increment("balance", {
      by: updateObj.amount,
      transaction: t,
    });

    await oldIncome.update(updateObj, { transaction: t });

    return oldIncome;
  });
};
