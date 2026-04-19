const { Category } = require("../../models");
const validationError = require("../../errors");

module.exports = async (queryObj) => {
  const category = await Category.findAll({
    where: {
      type: queryObj.type,
    },
    attributes: ["id", "name", "imageUrl", "type"],
  });

  if (!category) {
    throw new validationError("Category not found");
  }

  return category;
  s;
};
