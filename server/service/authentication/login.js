const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const validationError = require("../../errors");

module.exports = async (email, password) => {
  console.log("here", email, password);
  const user = await User.findOne({
    where: { email: email },
  });
  if (!user) {
    throw new validationError("Invalid Credentials", 404);
  }

  const isPasswordValid = await user.validPassword(password);
  if (!isPasswordValid) {
    throw new validationError("Invalid Credentials", 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return token;
};
