const { Savings, Account } = require("../../models");
const validationError = require("../../errors");

module.exports = async (updateObj) => {
  const saving = await Savings.findOne({
    where: { id: updateObj.id },
  });
  if (!saving) {
    throw new validationError("Saving not found", 404);
  }

  if (!saving.is_active) {
    throw new validationError("Saving is not active", 400);
  }

  const account = await Account.findByPk(saving.account_id);
  if (!account) {
    throw new validationError("Account not found", 404);
  }
  if (account.user_id !== updateObj.user_id) {
    throw new validationError("Account does not belong to user", 403);
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
