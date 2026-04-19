const expenseRouter = require("express").Router();
const jwtService = require("../../../utils/authenticate-jwt-token");
const findUserBasedOnEmail = require("../../../utils/find-user-based-on-email");
const accProviderController = require("../../../controllers/accProvider");
const upload = require("../../../utils/cloudinary");
expenseRouter.use(jwtService, (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

expenseRouter.use(async (req, res, next) => {
  try {
    req.decoded = await findUserBasedOnEmail(req.auth);
    next();
  } catch (error) {
    next(error);
  }
});

expenseRouter.get("/expensetest", (req, res, next) => {
  try {
    res.json({ message: "Expense test successful", user: req.decoded });
  } catch (error) {
    next(error);
  }
});

expenseRouter.post(
  "/provider",
  upload.single("logo_url"),
  accProviderController.addProvider,
);

expenseRouter.use("/account", require("./accountRoute"));
expenseRouter.use("/user", require("./UserDetail"));

expenseRouter.use("/income", require("./incomeRoute"));
expenseRouter.use("/category", require("./category"));

module.exports = expenseRouter;
