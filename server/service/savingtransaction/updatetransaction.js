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
      await t.rollback();
      throw new validationError("Account not found", 404);
    }

    console.log("acc", account.balance, "upd", updateObj.amount);

    if (
      parseInt(account.balance) < 0 ||
      parseInt(account.balance) < parseInt(updateObj.amount)
    ) {
      await t.rollback();
      throw new validationError("Insufficient account balance", 400);
    }

    const savingTransaction = await SavingTransaction.findOne({
      where: {
        id: updateObj.transactionId,
      },
    });

    if (!savingTransaction) {
      await t.rollback();
      throw new validationError("Saving transaction not found", 404);
    }

    let interestEarned = savingTransaction?.interest_earned;

    if (updateObj.amount) {
      const accountBalance =
        parseInt(updateObj.amount) - parseInt(savingTransaction.amount);

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

    const updated = await savingTransaction.update(
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

    await t.commit();
    return updated;
  } catch (err) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw err;
  }
};
