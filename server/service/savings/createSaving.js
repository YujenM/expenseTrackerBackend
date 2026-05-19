const { Savings,Account } = require("../../models");
const validationError = require("../../errors");

module.exports = async (createObj) => {

  const account = await Account.findByPk(createObj.account_id);
  const newSaving = await Savings.create({
    user_id: createObj.user_id,
    account_id: createObj.account_id,
    category_id: createObj.category_id,
    type: createObj.type,
    amount: createObj.amount,
    start_date: createObj.start_date,
    end_date: createObj.end_date,
    interest_rate: createObj.interest_rate,
    monthly_installment: createObj.monthly_installment,
    total_deposited: createObj.total_deposited,
    maturity_amount: createObj.maturity_amount,
    status: createObj.status,
  });
  if (!newSaving) {
    throw validationError("Failed to create saving");
  }
  return newSaving;
};
