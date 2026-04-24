const { Income, Account, Provider } = require("../../models");
const validationError = require("../../errors");
module.exports = async (queryObj) => {
  const income = await Income.findAll({
    where: {
      user_id: queryObj.user_Id,
    },
    attributes:['id','account_id','amount','source','description','category_id'],
    include: [
      {
        model: Account,
        as: "account",
        attributes: ["provider_id"],
        include: [
          {
            model: Provider,
            as: "provider",
            attributes: ["name", "logo_url", "type"],
          },
        ],
      },
    ],
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
