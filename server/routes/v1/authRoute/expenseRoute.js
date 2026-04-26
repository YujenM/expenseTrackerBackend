const router = require("express").Router();
const monthlyBudgetController = require("../../../controllers/expenses");
router.route("/monthlyBudget").put(monthlyBudgetController.monthlyBudget);

router.route("/").post(monthlyBudgetController.addExpenses);

router
  .route("/:expenseId")
  .put(monthlyBudgetController.updateExpense)
  .delete(monthlyBudgetController.deleteExpense);
module.exports = router;
