"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      avatar_url: {
        type: DataTypes.STRING(255),
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING(6),
        unique: true,
      },
      last_login: {
        type: DataTypes.DATE,
      },
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
