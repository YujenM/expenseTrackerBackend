const router = require("express").Router();
const createSavingController = require("../../../controllers/savings");
router
  .route("/")
  .post(createSavingController.createSavings)
  .get(createSavingController.getSaving);

router
  .route("/:id")
  .patch(createSavingController.updateSavings)
  .delete(createSavingController.deleteSaving);

module.exports = router;
