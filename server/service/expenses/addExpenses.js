const { Expense, Account, sequelize } = require("../../models");
const ValidaitionError = require("../../errors");
const { ValidationError } = require("sequelize");

module.exports = async (createObj) => {
  const t = await sequelize.transaction();

  //check if user has that account or it belongs to the user or not
  const account = await Account.findOne(
    {
      where: {
        id: createObj.account_id,
      },
    },
    { transaction: t },
  );
  if (!account || account.user_id !== createObj.user_id) {
    await t.rollback();
    throw new ValidaitionError("account not found", 404);
  }
  if (account.balance < createObj.amount) {
    await t.rollback()
    throw new ValidationError("insufficent balance in account", 403);
  }

  await account.decrement(
    "balance",
    { by: createObj.amount },
    { transaction: t },
  );

  const userExpense = await Expense.create(
    {
      user_id: createObj.user_id,
      account_id: createObj.account_id,
      category_id: createObj.category_id,
      amount: createObj.amount,
      description: createObj.description,
    },
    {
      transaction: t,
    },
  );

  if (!userExpense) {
    await t.rollback();
  }
  await t.commit();
  return userExpense;
};
