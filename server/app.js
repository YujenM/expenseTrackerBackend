// imports
const express = require("express");
const rateLimit = require("express-rate-limit");
const httpStatus = require("http-status");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    status: httpStatus.TOO_MANY_REQUESTS,
    message: "Too many requests",
  },
});

app.use(limiter);

const PORT = process.env.PORT || 5000;

const { Sequelize } = require("./models");

if (process.env.DB_TYPE === "mysql") {
  const sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_User,
    process.env.DB_Pass,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_TYPE,
    },
  );
  (async () => {
    try {
      await sequelize.authenticate();
      console.log(
        "Connection to the database has been established successfully.",
      );
      await sequelize.sync();
    } catch (error) {
      console.error(
        "Unable to connect to the database:",
        error.original.sqlMessage,
      );
    }
  })();
} else if (process.env.DB_TYPE === "postgres") {
  const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL_REQUIRE ? true : false,
        rejectUnauthorized: process.env.DB_SSL_REJECTUNAUTHORIZED
          ? true
          : false,
      },
    },
  });
  (async () => {
    try {
      await sequelize.authenticate();
      console.log(
        "Connection to the database has been established successfully.",
      );
      await sequelize.sync();
    } catch (error) {
      console.error(
        "Unable to connect to the database:",
        error.original.sqlMessage,
      );
    }
  })();
}

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"expense Tracker Api"
  })
})

app.use("/v1/expense", require("./routes/v1"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
