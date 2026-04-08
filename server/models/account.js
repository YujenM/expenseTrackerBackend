"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Account.belongsTo(models.Provider, {
        foreignKey: "provider_id",
        as: "provider",
      });
      Account.hasMany(models.Income, {
        foreignKey: "account_id",
        as: "incomes",
      });
      Account.hasMany(models.Expense, {
        foreignKey: "account_id",
        as: "expenses",
      });
      Account.hasMany(models.Savings, {
        foreignKey: "account_id",
        as: "savings",
      });
    }
  }
  Account.init(
    {
      id: { type: DataTypes.UUID },
      user_id: { type: DataTypes.UUID },
      provider_id: { type: DataTypes.UUID },
      account_name: { type: DataTypes.STRING(100) },
      balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    },
    {
      sequelize,
      modelName: "Account",
    },
  );
  return Account;
};
