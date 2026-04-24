const { Income } = require("../../models");
const validationError = require("../../errors");

module.exports = async (queryObj) => {
  const primarySource = await Income.findOne({
    where: {
      user_id: queryObj.user_id,
      isPrimary: true,
    },
  });


  return primarySource;
};
