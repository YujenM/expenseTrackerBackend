const { User } = require("../models");
const { validationErrorUser } = require("../errors");

module.exports = async (auth) => {
  try {
    const user = await User.findOne({
      where: {
        email: auth.email,
      },
    });

    if (!user) {
      throw new validationErrorUser("User not found", 404);
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};
