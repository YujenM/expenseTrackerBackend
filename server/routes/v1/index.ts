import express from "express";

const router = express.Router();
const authenticateRoute = require("./authentication");

router.use("/auth", authenticateRoute);

module.exports = router;
