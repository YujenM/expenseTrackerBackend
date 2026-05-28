const { Savings, Category } = require("../../models");
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
    ],
  });

  if (!savings || savings.length === 0) {
    throw new validationError("Saving not found", 404);
  }

  return savings;
};
