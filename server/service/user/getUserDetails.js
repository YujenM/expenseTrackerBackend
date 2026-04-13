const { User, Account } = require("../../models");
const validationErrors = require("../../errors");

module.exports = async (queryObj) => {
  const user = await User.findOne({
    where: {
      id: queryObj.userId,
    },
    attributes: ["id", "fullName", "phone"],
  });
  if (!user) {
    throw validationErrors.notFound("User not found");
  }
  const totalBalance =
    (await Account.sum("balance", {
      where: {
        user_id: user.id,
        active: true,
      },
    })) || 0;
  return {
    user,
    totalBalance,
  };
};
