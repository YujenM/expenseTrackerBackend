const savingService = require("../../service/savings");

module.exports = async (req, res, next) => {
  try {
    console.log("here", req.params.id, req.decoded.id);
    const userId = req.decoded.id;
    const savingId = req.params.id;

    await savingService.deleteSaving({ user_id: userId, saving_id: savingId });

    res.status(204).json({
      message: "Saving deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
