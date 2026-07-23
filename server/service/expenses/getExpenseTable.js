const { Expense, Category, Account, Provider } = require("../../models");
const { Op } = require("sequelize");
const validationError = require("../../errors");

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

  const page = parseInt(obj.page) > 0 ? parseInt(obj.page) : 1;
  const limit = parseInt(obj.limit) > 0 ? parseInt(obj.limit) : 10;

  const offset = (page - 1) * limit;

  const expenseWhere = {
    user_id: obj.userId,
  };

  if (obj.date) {
    const selectedDate = new Date(obj.date);
    const startOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      59,
      59,
    );
    expenseWhere.expense_date = { [Op.between]: [startOfDay, endOfDay] };
  } else {
    expenseWhere.expense_date = { [Op.between]: [startOfMonth, endOfMonth] };
  }

  if (obj.search) {
    expenseWhere.description = { [Op.iLike]: `%${obj.search}%` };
  }

  const expenseResult = await Expense.findAndCountAll({
    where: expenseWhere,
    attributes: { exclude: ["createdAt", "updatedAt"] },
    limit: limit,
    offset: offset,
    distinct: true,
    col: "id",
    order: [["expense_date", "DESC"]],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "imageUrl", "type"],
      },
      {
        model: Account,
        as: "account",
        attributes: ["id", "provider_id", "account_name"],
        include: [
          {
            model: Provider,
            as: "provider",
            attributes: ["name", "logo_url"],
          },
        ],
      },
    ],
  });

  const total = expenseResult.count;
  const totalPages = Math.ceil(total / limit);

  return {
    expenseTable: expenseResult.rows,
    pagination: {
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages,
    },
  };
};
