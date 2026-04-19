const { Income } = require("../../models");
const validationError = require("../../errors");
module.exports = async (queryObj) => {
  const income = await Income.findAll({
    where: {
      user_id: queryObj.user_Id,
    },
  });

  if (!income) {
    throw new validationError("No income found", 404);
  }

  const totalIncome = await Income.sum("amount", {
    where: {
      user_id: queryObj.user_Id,
    },
  });

  return { income, totalIncome };
};
