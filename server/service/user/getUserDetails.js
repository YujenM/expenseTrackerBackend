const { User, Account, Provider, Income, Expense } = require("../../models");
const validationErrors = require("../../errors");
const { Op } = require("sequelize");

module.exports = async (queryObj) => {
  const user = await User.findOne({
    where: {
      id: queryObj.userId,
    },
    attributes: ["id", "fullName", "phone", "dateFormat"],
    include: [
      {
        model: Account,
        as: "accounts",
        attributes: ["id", "balance", "account_name"],
        include: [
          {
            model: Provider,
            as: "provider",
            attributes: ["id", "name", "logo_url"],
          },
        ],
      },
    ],
  });
  if (!user) {
    throw validationErrors.notFound("User not found");
  }
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
  const totalBalance =
    (await Account.sum("balance", {
      where: {
        user_id: user.id,
        active: true,
      },
    })) || 0;

  const monthlyIncome = await Income.sum("amount", {
    where: {
      user_id: user.id,
      createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
    },
  });
  const monthlyExpense = await Expense.sum("amount", {
    where: {
      user_id: user.id,
      createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
    },
  });
  return {
    user,
    totalBalance,
    monthlyIncome,
    monthlyExpense,
  };
};
