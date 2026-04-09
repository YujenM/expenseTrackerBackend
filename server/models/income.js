"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Income.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Income.belongsTo(models.Account, { foreignKey: "account_id", as: "account" });
    }
  }
  Income.init(
    {
     id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      source: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT(200), allowNull: false },
      income_date: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Income",
    },
  );
  return Income;
};
