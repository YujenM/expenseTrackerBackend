const { Income } = require("../../models");
const validationError = require("../../errors");

module.exports = async (queryObj) => {
  const primarySource = await Income.findOne({
    where: {
      user_id: queryObj.user_id,
      isPrimary: true,
    },
  });

  if (!primarySource) {
    throw new validationError("No primary income source found", 404);
  }

  return primarySource;
};
