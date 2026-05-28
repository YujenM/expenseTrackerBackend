const { Savings } = require("../../models");
const validationError = require("../../errors");

module.exports = async (deleteObj) => {
  console.log("deleteObj", deleteObj);
  const saving = await Savings.findOne({
    where: {
      id: deleteObj.saving_id,
      user_id: deleteObj.user_id,
      is_active: true,
    },
  });

  if (!saving) {
    throw new validationError("Saving not found", 404);
  }

  await Savings.update(
    {
      is_active: false,
    },
    {
      where: {
        id: deleteObj.saving_id,
        user_id: deleteObj.user_id,
      },
    },
  );
  return saving;
};
