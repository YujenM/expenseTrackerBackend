const { Savings, SavingTransaction } = require("../../models");
const validationError = require("../../errors");

module.exports = async (savingObj) => {
  const getAllTransaction = await Savings.findAll({
    where: {
      id: savingObj.savingId,
      user_id: savingObj.userId,
      is_active: true,
    },
    attributes: [],
    include: {
      model: SavingTransaction,
      as: "transactions",
    },
  });

  if (!getAllTransaction) {
    throw new validationError("No transactions found", 404);
  }

  return getAllTransaction;
};
