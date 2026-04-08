"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Transaction.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account",
      });
      Transaction.belongsTo(models.Savings, {
        foreignKey: "reference_id",
        as: "savings",
      });
      Transaction.belongsTo(models.Expense, {
        foreignKey: "reference_id",
        as: "expense",
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      account_id: { type: DataTypes.UUID, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      reference_id: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
