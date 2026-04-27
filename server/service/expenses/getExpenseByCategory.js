const { Expense, Category, sequelize } = require("../../models");
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

  const expenses = await Expense.findAll({
    where: {
      user_id: obj.userId,
      createdAt: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "imageUrl"],
      },
    ],
    attributes: [
      "category_id",
      [sequelize.fn("SUM", sequelize.col("amount")), "total_spent"],
    ],
    group: ["category_id", "category.id", "category.name", "category.imageUrl"],
    order: [[sequelize.fn("SUM", sequelize.col("amount")), "DESC"]],
  });

  if (!expenses.length) {
    throw new validationError("no expense found", 404);
  }

  return expenses;
};
