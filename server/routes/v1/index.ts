import express from "express";

const router = express.Router();
const authenticateRoute = require("./authentication");
const expenseAuthRoute=require('./authRoute');

router.use("/auth", authenticateRoute);
router.use("/", expenseAuthRoute);

module.exports = router;
