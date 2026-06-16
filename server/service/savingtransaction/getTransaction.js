const {
  Savings,
  SavingTransaction,
  Category,
  Account,
  Provider,
} = require("../../models");
const validationError = require("../../errors");

module.exports = async (savingObj) => {
  const saving = await Savings.findOne({
    where: {
      id: savingObj.savingId,
      user_id: savingObj.userId,
    },
    order: [[{ model: SavingTransaction, as: "transactions" }, "transaction_date", "ASC"]],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["name", "imageUrl", "type"],
      },
      {
        model: Account,
        as: "account",
        attributes: ["id"],
        include: [
          {
            model: Provider,
            as: "provider",
            attributes: ["id", "name", "logo_url"],
          },
        ],
      },
      {
        model: SavingTransaction,
        as: "transactions",
      },
    ],
  });

  const totalInterestEarned = parseFloat(
    saving.transactions.reduce((sum, t) => {
      return sum + parseFloat(t.interest_earned);
    }, 0).toFixed(4)
  );

  const totalDeposited = parseFloat(
    saving.transactions.reduce((sum, t) => {
      return sum + parseFloat(t.amount || 0);
    }, 0).toFixed(4)
  );

  const transactions = saving.transactions || [];
  const lastTransaction = transactions[transactions.length - 1];
  const nextDeductionDate = lastTransaction?.next_deduction_date || null;

  return {
    account: saving.account.provider,
    interest: saving.interest_rate,
    maturity: saving.maturity_amount,
    status: saving.status,
    Category: saving.Category,
    total_deposited: totalDeposited,
    totalInterestEarned,
    nextDeductionDate,
    savingTransaction: saving.transactions,
  };
};