const {
  Savings,
  SavingTransaction,
  Account,
  sequelize,
} = require("../../models");
const validationError = require("../../errors");

module.exports = async (deleteObj) => {
  const t = await sequelize.transaction();
  try {
    const savings = await Savings.findOne({
      where: {
        id: deleteObj.savingId,
        user_id: deleteObj.userId,
        is_active: true,
      },
      transaction: t,
    });

    if (!savings) {
      await t.rollback();
      throw new validationError("Savings account not found", 404);
    }

    await Account.increment("balance", {
      by: savings.amount,
      where: {
        id: deleteObj.userId,
      },
      transaction: t,
    });
    const savingTransaction = await SavingTransaction.findOne({
      where: {
        id: deleteObj.transactionId,
        saving_id: savings.id,
      },
      transaction: t,
    });

    if (!savingTransaction) {
      await t.rollback();
      throw new validationError("Transaction not found", 404);
    }

    await savingTransaction.destroy({ transaction: t });
    await t.commit();
  } catch (err) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw err;
  }
};
