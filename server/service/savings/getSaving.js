const { Savings, Category, Account, Provider } = require("../../models");
const validationError = require("../../errors");

module.exports = async (userId) => {
  const savings = await Savings.findAll({
    where: { user_id: userId, is_active: true },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["name", "imageUrl", "type"],
      },
      {
        model: Account,
        as: "account",
        attributes: ["id"],
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

  if (!savings || savings.length === 0) {
    throw new validationError("Saving not found", 404);
  }

  return savings;
};
