const { Account, Provider } = require("../../models");
const validationError = require("../../errors");

module.exports = async (queryObj) => {
  const accounts = await Account.findAll({
    where: {
      user_id: queryObj.user_id,
      active: true,
    },
    include: [
      {
        model: Provider,
        as: "provider",
        attributes: ["name", "type", "logo_url"],
      },
    ],
  });
  if (accounts.length === 0) {
    throw new validationError("No accounts found", 404);
  }
  const totalBalance = await Account.sum("balance", {
    where: {
      user_id: queryObj.user_id,
      active: true,
    },
  });
  return { accounts, totalBalance };
};
