const userService = require("../../service/user");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const userDetails = await userService.getUserDetail({ userId });
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};
