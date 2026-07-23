const monthlyBudget = require("./monthlyBudget");
const addExpenses = require("./addExpenses");
const updateExpense = require("./updateExpense");
const deleteExpense = require("./deleteExpesnse");
const getExpense = require("./getExpense");
const getExpenseByCategory = require("./getExpenseByCategory");
const getExpenseTable = require("./getExpenseTable");

module.exports = {
  monthlyBudget,
  addExpenses,
  updateExpense,
  deleteExpense,
  getExpense,
  getExpenseByCategory,
  getExpenseTable,
};
