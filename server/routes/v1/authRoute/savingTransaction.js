const router = require("express").Router({ mergeParams: true });
const savingTransactionController = require("../../../controllers/savingTransaction");

router.route("/").post(savingTransactionController.createTransaction);



module.exports = router;
