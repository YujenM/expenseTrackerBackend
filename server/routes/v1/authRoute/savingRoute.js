const router = require("express").Router();
const createSavingController = require("../../../controllers/savings");
router.route("/").post(createSavingController.createSavings);

router.route("/:id").patch(createSavingController.updateSavings);

module.exports = router;
