const {
  Savings,
  SavingTransaction,
  Account,
  sequelize,
} = require("../../models");
const validationError = require("../../errors");
const monthlyInterest = require("../../utils/monthlyIntrestEarned");

module.exports = async (createObj) => {
  const t = await sequelize.transaction();

  try {
    const savings = await Savings.findOne({
      where: {
        id: createObj.savingId,
        user_id: createObj.userId,
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
      throw new validationError("Account not found");
    }
    if (account.balance < 0 || account.balance < createObj.amount) {
      await t.rollback();
      throw new validationError("Insufficient account balance", 400);
    }

    const interestEarned = monthlyInterest(
      createObj.amount,
      savings.start_date,
      savings.end_date,
      savings.interest_rate,
    );

    if (account.balance < createObj.amount) {
      await t.rollback();
      throw new validationError("Insufficient account balance", 400);
    }

    await account.decrement("balance", {
      by: createObj.amount,
      transaction: t,
    });

    await SavingTransaction.create(
      {
        user_id: createObj.userId,
        account_id: savings.account_id,
        saving_id: createObj.savingId,
        transaction_type: "deposit",
        amount: createObj.amount,
        interest_earned: interestEarned,
        transaction_date: createObj.transaction_date,
        next_deduction_date: createObj.next_deduction_date || null,
        remarks: createObj.remarks || null,
      },
      {
        transaction: t,
      },
    );
    await t.commit();
  } catch (err) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw err;
  }
};
