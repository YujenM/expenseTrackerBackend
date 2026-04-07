const loginservice = require("../../service/authentication");

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await loginservice.login(email, password);
    res
      .status(200)
      .json({ message: "Login successful", response });
  } catch (error) {
    next(error);
  }
};
