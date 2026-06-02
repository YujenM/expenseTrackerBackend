const router = require("express").Router({ mergeParams: true });
const savingTransactionController = require("../../../controllers/savingTransaction");

router
  .route("/")
  .post(savingTransactionController.createTransaction)
  .get(savingTransactionController.getTransaction);

router
  .route("/:transactionId")
  .patch(savingTransactionController.updateTransaction)
  .delete(savingTransactionController.deleteTransaction);

module.exports = router;
