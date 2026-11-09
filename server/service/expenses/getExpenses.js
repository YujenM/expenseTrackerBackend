const { User, Expense, Category, Account, Provider } = require("../../models");
const { Op } = require("sequelize");
const validationError = require("../../errors");
const { parse } = require("path");

module.exports = async (obj) => {
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

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const monthlyExpense = await Expense.sum("amount", {
    where: {
      user_id: obj.userId,
      is_show_expense: true,
      expense_date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
  });

  const weeklyExpense = await Expense.sum("amount", {
    where: {
      user_id: obj.userId,
      is_show_expense: true,
      expense_date: { [Op.between]: [startOfWeek, endOfWeek] },
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

  const monthlySpentOnpercentage = (
    (monthlyExpense / user.monthly_budget) *
    100
  ).toFixed(2);

  const dayOfMonth = now.getDate();
  const dailyAverage = (monthlyExpense / dayOfMonth).toFixed(2);

  // const page = parseInt(obj.page) > 0 ? parseInt(obj.page) : 1;
  // const limit = parseInt(obj.limit) > 0 ? parseInt(obj.limit) : 10;

  // const offset = (page - 1) * limit;

  // const expenseWhere = {
  //   user_id: obj.userId,
  // };

  // if (obj.date) {
  //   const selectedDate = new Date(obj.date);
  //   const startOfDay = new Date(
  //     selectedDate.getFullYear(),
  //     selectedDate.getMonth(),
  //     selectedDate.getDate(),
  //     0,
  //     0,
  //     0,
  //   );
  //   const endOfDay = new Date(
  //     selectedDate.getFullYear(),
  //     selectedDate.getMonth(),
  //     selectedDate.getDate(),
  //     23,
  //     59,
  //     59,
  //   );
  //   expenseWhere.expense_date = { [Op.between]: [startOfDay, endOfDay] };
  // } else {
  //   expenseWhere.expense_date = { [Op.between]: [startOfMonth, endOfMonth] };
  // }

  // if (obj.search) {
  //   expenseWhere.description = { [Op.iLike]: `%${obj.search}%` };
  // }

  // const expenseResult = await Expense.findAndCountAll({
  //   where: expenseWhere,
  //   attributes: { exclude: ["createdAt", "updatedAt"] },
  //   limit: limit,
  //   offset: offset,
  //   distinct: true,
  //   col: "id",
  //   order: [["expense_date", "DESC"]],
  //   include: [
  //     {
  //       model: Category,
  //       as: "category",
  //       attributes: ["id", "name", "imageUrl", "type"],
  //     },
  //     {
  //       model: Account,
  //       as: "account",
  //       attributes: ["id", "provider_id", "account_name"],
  //       include: [
  //         {
  //           model: Provider,
  //           as: "provider",
  //           attributes: ["name", "logo_url"],
  //         },
  //       ],
  //     },
  //   ],
  // });
  // const total = expenseResult.count;
  // const totalPages = Math.ceil(total / limit);
  return {
    monthlyBudget: user.monthly_budget,
    monthlyExpense,
    weeklyExpense,
    monthlySpentOnpercentage,
    dailyAverage,
  };
};
