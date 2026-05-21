const updateSaving = require("../../service/savings");
module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    await updateSaving.updateSaving({
      id: req.params.id,
      user_id: userId,
      ...req.body,
    });
    res.status(200).json({ message: "Saving updated successfully" });
  } catch (err) {
    next(err);
  }
};
