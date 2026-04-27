const { User, Expense, Category, Account,Provider } = require("../../models");
const { Op } = require("sequelize");
const validationError = require("../../errors");

module.exports = async (obj) => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const monthlyExpense = await Expense.sum("amount", {
    where: {
      user_id: obj.userId,
      createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
    },
  });

  const weeklyExpense = await Expense.sum("amount", {
    where: {
      user_id: obj.userId,
    },
  });

  const user = await User.findOne({
    where: {
      id: obj.userId,
    },
    attributes: ["id", "monthly_budget"],
  });
  if (!user) {
    throw new validationError("user not found", 404);
  }

  const monthlySpentOnpercentage = (monthlyExpense / user.monthly_budget) * 100;

  const dayOfMonth = now.getDate();
  const dailyAverage = monthlyExpense / dayOfMonth;

  const expenseTable = await Expense.findAll({
    where: {
      user_id: obj.userId,
      createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "imageUrl", "type"],
      },
      {
        model: Account,
        as: "account",
        attributes:['id','provider_id','account_name'],
        include:[
          {
            model:Provider,
            as:'provider',
            attributes:['logo_url']
          }
        ]
      },
    ],
  });

  return {
    monthlyBudget: user.monthly_budget,
    monthlyExpense,
    weeklyExpense,
    monthlySpentOnpercentage,
    dailyAverage,
    expenseTable,
  };
};
