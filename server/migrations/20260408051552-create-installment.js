"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Installments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
      },
      total_amt: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      monthly_amt: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      remaining_amt: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      next_due_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "ongoing",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Installments");
  },
};
