const { User, Account, Provider } = require("../../models");
const validationErrors = require("../../errors");

module.exports = async (queryObj) => {
  const user = await User.findOne({
    where: {
      id: queryObj.userId,
    },
    attributes: ["id", "fullName", "phone", "dateFormat"],
    include: [
      {
        model: Account,
        as: "accounts",
        attributes: ["id", "balance", "account_name"],
        include: [
          {
            model: Provider,
            as: "provider",
            attributes: ["id", "name", "logo_url"],
          },
        ],
      },
    ],
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
