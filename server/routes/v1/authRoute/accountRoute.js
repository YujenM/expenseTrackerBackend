const router = require("express").Router();
const accountController = require("../../../controllers/account");

router
  .route("/")
  .post(accountController.createAccount)
  .get(accountController.listAccount);
router
  .route("/:id")
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);

router.route("/provider").get(accountController.getProvider);
module.exports = router;
