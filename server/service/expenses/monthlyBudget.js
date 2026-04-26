const { User } = require("../../models");
const ValidationError = require("../../errors");

module.exports = async (createObj) => {
  const user = await User.findOne({
    where: {
      id: createObj.userId,
    },
    attributes: ["id", "monthly_budget"],
  });
  if (!user) {
    throw new ValidationError("user not found", 404);
  }

  await user.update(
    {
      monthly_budget: createObj.amount.amount,
    },
    { silent: true },
  );

  return user;
};
