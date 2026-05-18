"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SavingTransactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      saving_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Savings", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Accounts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transaction_type: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "deposit, deduction, interest, maturity_payout",
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      interest_earned: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      transaction_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      next_deduction_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      remarks: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
    await queryInterface.dropTable("SavingTransactions");
  },
};
