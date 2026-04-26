const { Expense, Account, sequelize } = require("../../models");
const ValidaitionError = require("../../errors");

module.exports = async (createObj) => {
  const t = await sequelize.transaction();

  const expense = await Expense.findOne({
    where: {
      id: createObj.expenseId,
      user_id: createObj.userId,
    },
    transaction: t,
  });

  if (!expense) {
    await t.rollback();
    throw new ValidaitionError("no expense found", 404);
  }

  const account = await Account.findOne({
    where: {
      id: expense.account_id,
    },
    transaction: t,
  });

  if (!account) {
    await t.rollback();
    throw new ValidaitionError("account not found", 404);
  }

  await account.increment("balance", { by: expense.amount, transaction: t });

  await expense.destroy({ transaction: t });

  await t.commit();
};
