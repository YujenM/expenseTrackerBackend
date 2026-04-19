const router = require("express").Router();
const categoryController = require("../../../controllers/category");
router.route("/").get(categoryController.getCategory);

module.exports = router;
