const savingTransactionService = require("../../service/savingtransaction");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const savingId = req.params.id;
    const transactions = await savingTransactionService.getTransaction({
      userId,
      savingId,
    });
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};
