const { Account, sequelize } = require("../../models");
const validationError = require("../../errors");

module.exports = async (transferObj) => {
  const t = await sequelize.transaction();
  try {
    const fromAccount = await Account.findByPk(transferObj.fromAccountId, {
      transaction: t,
    });
    const toAccount = await Account.findByPk(transferObj.toAccountId, {
      transaction: t,
    });

    if (!fromAccount || !toAccount) {
      throw new validationError("Account not found");
    }

    let finalAmount =
      parseFloat(transferObj.amount) + parseFloat(transferObj.charge);
    if (parseFloat(fromAccount.balance) < parseFloat(finalAmount)) {
      throw new validationError("Insufficient funds", 400);
    }
    await Account.decrement("balance", {
      by: transferObj.amount,
      where: {
        id: transferObj.fromAccountId,
      },
    });
    await Account.decrement("balance", {
      by: transferObj.charge,
      where: {
        id: transferObj.fromAccountId,
      },
    });
    await Account.increment("balance", {
      by: transferObj.amount,
      where: {
        id: transferObj.toAccountId,
      },
    });
    await t.commit();
  } catch (err) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw err;
  }
};
