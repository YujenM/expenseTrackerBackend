const { Income, Account, Provider, Category } = require("../../models");
const { Op } = require("sequelize");
const validationError = require("../../errors");
module.exports = async (queryObj) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );
  const income = await Income.findAll({
    where: {
      user_id: queryObj.user_Id,
      income_date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
    },
    attributes: [
      "id",
      "account_id",
      "amount",
      "source",
      "description",
      "category_id",
      "income_date",
      "nextExpectedDate",
      "isPrimary",
    ],
    include: [
      {
        model: Account,
        as: "account",
        attributes: ["provider_id"],
        include: [
          {
            model: Provider,
            as: "provider",
            attributes: ["id", "name", "logo_url", "type"],
          },
        ],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
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
