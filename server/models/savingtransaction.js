"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavingTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SavingTransaction.belongsTo(models.Savings, {
        foreignKey: "saving_id",
        as: "saving",
      });
      SavingTransaction.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account",
      });
    }
  }
  SavingTransaction.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      saving_id: { type: DataTypes.INTEGER, allowNull: false },
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      transaction_type: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: "deposit, deduction, interest, maturity_payout",
      },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      interest_earned: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      transaction_date: { type: DataTypes.DATEONLY, allowNull: false },
      next_deduction_date: { type: DataTypes.DATEONLY, allowNull: true },
      remarks: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
      sequelize,
      modelName: "SavingTransaction",
    },
  );
  return SavingTransaction;
};
