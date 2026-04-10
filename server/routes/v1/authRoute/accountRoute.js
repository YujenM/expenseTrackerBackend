const router = require("express").Router();
const accountController = require("../../../controllers/account");

router
  .route("/account")
  .post(accountController.createAccount)
  .get(accountController.listAccount);
router
  .route("/account/:id")
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
