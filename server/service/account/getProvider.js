const { Provider } = require("../../models");
const validationError = require("../../errors");

module.exports = async () => {
  const providers = await Provider.findAll();
  if (!providers) {
    throw new validationError.NotFound("No providers found", 404);
  }
  return providers;
};
