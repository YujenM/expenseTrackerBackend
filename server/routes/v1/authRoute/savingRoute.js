const router = require("express").Router();
const createSavingController = require("../../../controllers/savings");
const transactionRoute = require("./savingTransaction");
router
  .route("/")
  .post(createSavingController.createSavings)
  .get(createSavingController.getSaving);

router
  .route("/:id")
  .patch(createSavingController.updateSavings)
  .delete(createSavingController.deleteSaving);

router.use("/:id/transaction", transactionRoute);

module.exports = router;
