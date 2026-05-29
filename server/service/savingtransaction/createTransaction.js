const {
  Savings,
  SavingTransaction,
  Account,
  sequelize,
} = require("../../models");
const validationError = require("../../errors");

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
      throw new validationError("Savings account not found");
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

    const allowedTypes = ["deposit", "deduction"];
    if (!allowedTypes.includes(createObj.transaction_type)) {
      await t.rollback();
      throw new validationError("Invalid transaction type", 400);
    }
    const principal = createObj.amount;
    const startDate = new Date(savings.start_date);
    const endDate = new Date(savings.end_date);
    const n =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    const interestEarned = parseFloat(
      (
        principal *
        ((n * (n + 1)) / (2 * 12 * 12)) *
        (savings.interest_rate / 100)
      ).toFixed(2),
    );

    if (createObj.transaction_type === "deposit") {
      if (account.balance < createObj.amount) {
        await t.rollback();
        throw new validationError("Insufficient account balance", 400);
      }
      await account.decrement("balance", {
        by: createObj.amount,
        transaction: t,
      });
      await savings.increment("total_deposited", {
        by: createObj.amount,
        transaction: t,
      });
    } else if (createObj.transaction_type === "deduction") {
      if (savings.total_deposited < createObj.amount) {
        await t.rollback();
        throw new validationError("Insufficient savings balance", 400);
      }
      await account.increment("balance", {
        by: createObj.amount,
        transaction: t,
      });
      await savings.decrement("total_deposited", {
        by: createObj.amount,
        transaction: t,
      });
    }
    await SavingTransaction.create(
      {
        user_id: createObj.userId,
        account_id: savings.account_id,
        saving_id: createObj.savingId,
        transaction_type: createObj.transaction_type,
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
