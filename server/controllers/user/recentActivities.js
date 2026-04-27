const userService = require("../../service/user");
module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const response = await userService.recentActivities({
      userId: userId,
    });
    res.status(200).json({
      message: "scuess",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
