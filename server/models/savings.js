"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Savings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Savings.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Savings.belongsTo(models.Account, {
        foreignKey: "account_id",
        as: "account",
      });
      Savings.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Savings.init(
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
      type: { type: DataTypes.STRING(50), allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      interest_rate: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    },
    {
      sequelize,
      modelName: "Savings",
    },
  );
  return Savings;
};
