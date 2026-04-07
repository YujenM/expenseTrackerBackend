const signupService = require("../../service/authentication");

module.exports = async (req, res, next) => {
  try {
    const { email, password, fullName, phone } = req.body;
    const newUser = await signupService.signup(
      email,
      phone,
      password,
      fullName,
    );
    return res
      .status(200)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
