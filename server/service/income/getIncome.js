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

  const page = parseInt(queryObj.page) > 0 ? parseInt(queryObj.page) : 1;
  const limit = parseInt(queryObj.limit) > 0 ? parseInt(queryObj.limit) : 10;
  const offset = (page - 1) * limit;

  const incomeWhere = {
    user_id: queryObj.user_Id,
  };

  if (queryObj.date) {
    //here - filter by income_date if a date is passed, else default to current month
    const selectedDate = new Date(queryObj.date);
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
    incomeWhere.income_date = { [Op.between]: [startOfDay, endOfDay] };
  } else {
    incomeWhere.income_date = { [Op.between]: [startOfMonth, endOfMonth] };
  }

  if (queryObj.search) {
    incomeWhere.description = { [Op.iLike]: `%${queryObj.search}%` };
  }

  const income = await Income.findAndCountAll({
    where: incomeWhere,
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
    limit: limit,
    offset: offset,
    distinct: true,
    col: "id",
    order: [["income_date", "DESC"]],
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
      income_date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
      user_id: queryObj.user_Id,
    },
  });

  const total = income.count;
  const totalPages = Math.ceil(total / limit);

  return {
    income: income.rows,
    totalIncome,
    pagination: {
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages,
    },
  };
};
