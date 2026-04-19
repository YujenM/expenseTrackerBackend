"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Category.hasMany(models.Expense, {
        foreignKey: "category_id",
        as: "expenses",
      });
      Category.hasMany(models.Income, {
        foreignKey: "category_id",
        as: "incomes",
      });
      Category.hasMany(models.Savings, {
        foreignKey: "category_id",
        as: "savings",
      });
      Category.hasMany(models.Loan, {
        foreignKey: "category_id",
        as: "loans",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING(100) },
      imageUrl: { type: DataTypes.STRING(255) },
      type: { type: DataTypes.STRING(50) },
    },
    {
      sequelize,
      modelName: "Category",
    },
  );
  return Category;
};
