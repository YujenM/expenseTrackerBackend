const getSavingService = require("../../service/savings");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const saving = await getSavingService.getSaving(userId);
    res.json(saving);
  } catch (err) {
    next(err);
  }
};
