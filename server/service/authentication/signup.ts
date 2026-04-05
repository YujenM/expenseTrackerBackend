import { error } from "node:console";

const { User } = require("../../models");
const validationErrorSignup = require("../../errors");

module.exports = async (
  email: string,
  phone: string,
  password: string,
  fullName: String,
) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    throw new validationErrorSignup("Email already in use", 409);
  }
  const newUser = await User.create({
    email,
    phone,
    password_hash: password,
    fullName,
    avatar_url: null,
    otp: null,
    last_login: null,
  });
  return newUser;
};
