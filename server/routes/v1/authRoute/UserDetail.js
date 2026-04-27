const router = require("express").Router();
const userController = require("../../../controllers/user");

router.route("/").get(userController.getUserDetail);
router.route("/recent").get(userController.recentActivities);

module.exports = router;
