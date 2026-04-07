const expenseRouter = require("express").Router();
const jwtService = require("../../../utils/authenticate-jwt-token");
const findUserBasedOnEmail = require("../../../utils/find-user-based-on-email");

expenseRouter.use(jwtService, (req: any, res: any, next: any) => {
  try {
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

expenseRouter.use(async (req: any, res: any, next: any) => {
  try {
    req.decoded = await findUserBasedOnEmail(req.auth);
    next();
  } catch (error) {
    next(error);
  }
});

expenseRouter.get("/expensetest", (req: any, res: any, next: any) => {
  try {
    res.json({ message: "Expense test successful", user: req.decoded });
  } catch (error) {
    next(error);
  }
});

module.exports = expenseRouter;
