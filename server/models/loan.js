"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loan.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Loan.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      person_name: { type: DataTypes.STRING(50), allowNull: false },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      given_date: { type: DataTypes.DATE, allowNull: false },
      return_date: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Loan",
    },
  );
  return Loan;
};
