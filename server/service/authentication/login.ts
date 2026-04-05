import jwt from "jsonwebtoken";
const { User } = require("../../models");
const validationError = require("../../errors");

module.exports = async (email: string, password: string) => {
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
    process.env.JWT_SECRET as string,

    { expiresIn: "1d" },
  );
  return token;
};
