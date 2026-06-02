const {
  Savings,
  SavingTransaction,
  Account,
  sequelize,
} = require("../../models");
const validationError = require("../../errors");
const monthlyInterest = require("../../utils/monthlyIntrestEarned");

module.exports = async (updateObj) => {
  const t = await sequelize.transaction();
  try {
    const savings = await Savings.findOne({
      where: {
        id: updateObj.savingId,
        user_id: updateObj.userId,
        is_active: true,
      },
      transaction: t,
    });

    if (!savings) {
      await t.rollback();
      throw new validationError("Savings account not found", 404);
    }

    const account = await Account.findOne({
      where: {
        id: savings.account_id,
        active: true,
      },
      transaction: t,
    });

    if (!account) {
      throw new validationError("Account not found", 404);
    }

    if (account.balance < 0 || account.balance < updateObj.amount) {
      await t.rollback();
      throw new validationError("Insufficient account balance", 400);
    }

    const savingTransaction = await SavingTransaction.findOne({
      where: {
        id: updateObj.transactionId,
      },
    });

    if (!savingTransaction) {
      throw new validationError("Saving transaction not found", 404);
    }

    if (account.balance < updateObj.amount) {
      await t.rollback();
      throw new validationError("Insufficient account balance", 400);
    }

    if (updateObj.amount) {
      const accountBalance = updateObj.amount - savingTransaction.amount;

      await account.decrement("balance", {
        by: accountBalance,
        transaction: t,
      });

      interestEarned = monthlyInterest(
        updateObj.amount,
        savings.start_date,
        savings.end_date,
        savings.interest_rate,
      );
    }
    let interestEarned = savingTransaction.interest_earned;
    await savingTransaction.update(
      {
        amount: updateObj.amount,
        interest_earned: interestEarned,
        transaction_date: updateObj.transaction_date,
        next_deduction_date: updateObj.next_deduction_date || null,
        remarks: updateObj.remarks || null,
      },
      {
        where: {
          id: updateObj.transactionId,
        },
        transaction: t,
      },
    );
  } catch (err) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw err;
  }
};
