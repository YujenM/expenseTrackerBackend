const { Income, Account } = require("../../models");
const validationError = require("../../errors");

module.exports = async (createObj) => {
  if (createObj.isPrimary) {
    const income = await Income.findOne({
      where: {
        user_id: createObj.user_id,
        isPrimary: true,
      },
    });
    if (income) {
      throw new validationError("Primary income source already exists", 400);
    }
  }

  const newIncome = await Income.create(createObj);
  const account = await Account.findByPk(createObj.account_id);
  await account.increment("balance", { by: createObj.amount });

  return newIncome;
};
