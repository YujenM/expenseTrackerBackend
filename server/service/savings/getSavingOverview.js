const {
  Savings,
  SavingTransaction,
  Category,
  Account,
  Provider,
} = require("../../models");
const validationError = require("../../errors");
const { where } = require("sequelize");

module.exports = async (userId) => {
  const savings = await Savings.findAll({
    where: {
      user_id: userId,
      is_active: true,
    },
    include: [
      {
        model: SavingTransaction,
        as: "transactions",
      },
    ],
  });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalSavings = 0;
  let thisMonthDeposit = 0;
  let totalInterestEarned = 0;
  let savingsWithDepositCount = 0;

  savings.forEach((saving) => {
    let savingMonthDeposit = 0;

    saving.transactions.forEach((txn) => {
      const txnDate = new Date(txn.transaction_date);
      const isThisMonth =
        txnDate.getMonth() === currentMonth &&
        txnDate.getFullYear() === currentYear;

      if (isThisMonth) {
        totalInterestEarned += parseFloat(txn.interest_earned);

        if (txn.transaction_type === "deposit") {
          thisMonthDeposit += parseFloat(txn.amount);
          savingMonthDeposit += parseFloat(txn.amount);
        }
      }
    });

    if (savingMonthDeposit > 0) {
      totalSavings += savingMonthDeposit;
      savingsWithDepositCount += 1;
    }
  });

  const avgMonthlyDeposited = savingsWithDepositCount
    ? totalSavings / savingsWithDepositCount
    : 0;

  return {
    totalSavings,
    thisMonthDeposit,
    totalInterestEarned,
    avgMonthlyDeposited,
  };
};