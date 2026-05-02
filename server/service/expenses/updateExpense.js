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

  if (!account || account.user_id !== createObj.userId) {
    await t.rollback();
    throw new ValidaitionError("account not found", 404);
  }

  if (parseFloat(account.balance) < parseFloat(createObj.amount)) {
    await t.rollback();
    throw new ValidaitionError("insufficent balance in account", 403);
  }

  await account.increment("balance", { by: expense.amount, transaction: t });

  await expense.update(
    {
      amount: createObj?.amount,
      description: createObj?.description,
      expense_date: createObj?.expense_date,
      category_id: createObj?.category_id,
    },
    { transaction: t },
  );

  await account.decrement("balance", { by: createObj.amount, transaction: t });

  await t.commit();
  return expense;
};
