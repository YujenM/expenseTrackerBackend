const transactionService = require("../../service/savingtransaction");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const { id, transactionId } = req.params;
    await transactionService.deleteTransaction({
      userId,
      savingId: id,
      transactionId,
    });
    res.status(204).json({
      message: "Transaction deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
