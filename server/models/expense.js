"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Expense.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account",
      });
      Expense.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Expense.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      description: { type: DataTypes.TEXT(200), allowNull: false },
      expense_date: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Expense",
    },
  );
  return Expense;
};
