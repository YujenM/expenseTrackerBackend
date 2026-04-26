"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.STRING(255),
      },
      fullName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      otp: {
        type: Sequelize.STRING(6),
        unique: true,
      },
      last_login: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dateFormat: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      monthly_budget: {
        type: Sequelize.DECIMAL(100, 3),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
