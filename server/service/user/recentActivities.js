const {
  Income,
  Expense,
  Savings,
  Loan,
  Installment,
  Category,
} = require("../../models");
const { Op } = require("sequelize");

module.exports = async (queryObj) => {
  const { userId } = queryObj;
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

  const incomes = await Income.findAll({
    where: {
      user_id: userId,
      income_date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    include: [{ model: Category, as: "category" }],
    order: [["income_date", "DESC"]],
    limit: 5,
  });

  const expenses = await Expense.findAll({
    where: {
      user_id: userId,
      expense_date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    include: [{ model: Category, as: "category" }],
    order: [["expense_date", "DESC"]],
    limit: 5,
  });

  const savings = await Savings.findAll({
    where: {
      user_id: userId,
      start_date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    include: [{ model: Category, as: "category" }],
    order: [["start_date", "DESC"]],
    limit: 5,
  });

  const loans = await Loan.findAll({
    where: {
      user_id: userId,
      given_date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    include: [{ model: Category, as: "category" }],
    order: [["given_date", "DESC"]],
    limit: 5,
  });

  const installments = await Installment.findAll({
    where: {
      user_id: userId,
      next_due_date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
    order: [["next_due_date", "DESC"]],
    limit: 5,
  });

  const combined = [
    ...incomes.map((i) => ({
      title: i.source,
      category: i.category?.name,
      categoryImage: i.category?.imageUrl,
      amount: i.amount,
      date: i.income_date,
      type: "income",
      tag: "Income",
    })),
    ...expenses.map((i) => ({
      title: i.description,
      category: i.category?.name,
      categoryImage: i.category?.imageUrl,
      amount: i.amount,
      date: i.expense_date,
      type: "expense",
      tag: i.category?.name || "Personal",
    })),
    ...savings.map((i) => ({
      title: i.type,
      category: i.category?.name,
      categoryImage: i.category?.imageUrl,
      amount: i.amount,
      date: i.start_date,
      type: "savings",
      tag: "Savings",
    })),
    ...loans.map((i) => ({
      title: i.person_name,
      category: i.category?.name,
      categoryImage: i.category?.imageUrl,
      amount: i.amount,
      date: i.given_date,
      type: "loan",
      tag: "Loan",
    })),
    ...installments.map((i) => ({
      title: i.title,
      category: null,
      categoryImage: null,
      amount: i.monthly_amt,
      date: i.next_due_date,
      type: "installment",
      tag: "Reoccurring",
    })),
  ];

  combined.sort((a, b) => new Date(b.date) - new Date(a.date));

  return combined.slice(0, 10);
};
