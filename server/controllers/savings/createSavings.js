const createSavingService = require("../../service/savings");

module.exports = async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const newSaving = await createSavingService.createSaving({
      user_id: userId,
      account_id: req.body.account_id,
      category_id: req.body.category_id,
      type: req.body.type,
      amount: req.body.amount,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      interest_rate: req.body.interest_rate,
      monthly_installment: req.body.monthly_installment,
      total_deposited: req.body.total_deposited,
      maturity_amount: req.body.maturity_amount,
      status: req.body.status,
    });
    res.status(201).json({
      message: "Saving created successfully",
    });
  } catch (err) {
    next(err);
  }
};
