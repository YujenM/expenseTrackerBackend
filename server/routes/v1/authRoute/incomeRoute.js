const router = require("express").Router();
const incomeController = require("../../../controllers/income");

router
  .route("/")
  .post(incomeController.addIncome)
  .get(incomeController.getIncome);
router
  .route("/:id")
  .put(incomeController.updateIncome)
  .delete(incomeController.deleteIncome);

router.route("/primary").get(incomeController.primarySource);

module.exports = router;
