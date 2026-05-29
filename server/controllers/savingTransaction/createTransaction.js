const savingTransactionService = require("../../service/savingtransaction");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const savingId = req.params.id;

    const createObj = {
      savingId: savingId,
      userId: userId,
      transaction_type: req.body.transaction_type,
      amount: req.body.amount,
      interest_earned: req.body.interest_earned,
      transaction_date: req.body.transaction_date,
      next_deduction_date: req.body.next_deduction_date,
      remarks: req.body.remarks,
    };

    const savingTransaction = await savingTransactionService.createTransaction(createObj);

    res.status(201).json({
      success: true,
      message: "Saving transaction created successfully",
      data: savingTransaction,
    });
  } catch (err) {
    next(err);
  }
};
