"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    async validPassword(password) {
      return await bcrypt.compare(password, this.password_hash);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      phone: { type: DataTypes.STRING(15), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING(50), allowNull: false },
      avatar_url: { type: DataTypes.STRING(255) },
      last_login: { type: DataTypes.DATE },
      fullName: { type: DataTypes.STRING(100) },
      otp: { type: DataTypes.STRING(6) },
    },
    {
      sequelize,
      modelName: "User",

      hooks: {
        beforeCreate: async (user) => {
          if (user.password_hash) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password_hash")) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
          }
        },
      },
    },
  );
  return User;
};
