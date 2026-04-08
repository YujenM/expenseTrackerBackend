"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Installment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Installment.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Installment.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      total_amt: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      monthly_amt: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      remaining_amt: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      next_due_date: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ongoing",
      },
    },
    {
      sequelize,
      modelName: "Installment",
    },
  );
  return Installment;
};
