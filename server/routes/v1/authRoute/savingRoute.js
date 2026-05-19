const router = require("express").Router();
const createSavingController = require("../../../controllers/savings");
router.route("/").post(createSavingController.createSavings);
module.exports = router;
