const validationError = require("../../errors");
const transactionService = require("../../service/savingtransaction");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const savingId = req.params.id;
    const transactionId = req.params.transactionId;

    if (!userId || !savingId || !transactionId) {
      throw new validationError("Missing required parameters", 400);
    }

    const updatedTransaction = await transactionService.updateTransaction({
      userId,
      savingId,
      transactionId,
      ...req.body,
    });

    res.status(200).json({
      message: "Transaction updated successfully",
      data: {
        updatedTransaction,
      },
    });
  } catch (err) {
    next(err);
  }
};
