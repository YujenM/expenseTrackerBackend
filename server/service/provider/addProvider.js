const { Provider } = require("../../models");
const validationError = require("../../errors");

module.exports = async (queryObj) => {
  const provider = await Provider.findOne({
    where: {
      name: queryObj.name,
    },
  });
  if (provider) {
    throw new validationError("Provider already exists", 409);
  }
  const newProvider = await Provider.create(queryObj);
  return newProvider;
};
