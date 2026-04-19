const { Income, Account, sequelize } = require("../../models");

module.exports = async (deleteObj) => {
  return await sequelize.transaction(async (t) => {
    const oldIncome = await Income.findByPk(deleteObj.id, { transaction: t });
    const account = await Account.findByPk(oldIncome.account_id, {
      transaction: t,
    });

    await account.decrement("balance", {
      by: oldIncome.amount,
      transaction: t,
    });

    await oldIncome.destroy({ transaction: t });

    return oldIncome;
  });
};
