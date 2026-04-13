const router = require("express").Router();
const userController = require("../../../controllers/user");

router.route("/").get(userController.getUserDetail);
module.exports = router;
