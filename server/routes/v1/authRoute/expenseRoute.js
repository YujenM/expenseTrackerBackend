const router = require("express").Router();
const monthlyBudgetController = require("../../../controllers/expenses");
router.route("/monthlyBudget").put(monthlyBudgetController.monthlyBudget);

router
  .route("/")
  .post(monthlyBudgetController.addExpenses)
  .get(monthlyBudgetController.getExpense);

router
  .route("/:expenseId")
  .put(monthlyBudgetController.updateExpense)
  .delete(monthlyBudgetController.deleteExpense);

router.route("/category").get(monthlyBudgetController.getExpenseByCategory);

module.exports = router;
