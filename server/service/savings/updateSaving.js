const { Savings, Account } = require("../../models");
const validationError = require("../../errors");

module.exports = async (updateObj) => {
  const saving = await Savings.findByPk(updateObj.id);
  if (!saving) {
    throw validationError("Saving not found");
  }

  const account = await Account.findByPk(saving.account_id);
  if (!account) {
    throw validationError("Account not found");
  }
  if (account.user_id !== updateObj.user_id) {
    throw validationError("Account does not belong to user");
  }

  await saving.update({
    category_id: updateObj.category_id,
    amount: updateObj.amount,
    start_date: updateObj.start_date,
    end_date: updateObj.end_date,
    interest_rate: updateObj.interest_rate,
    monthly_installment: updateObj.monthly_installment,
    total_deposited: updateObj.total_deposited,
    maturity_amount: updateObj.maturity_amount,
  });

  if (!saving) {
    throw validationError("Failed to update saving");
  }
};
