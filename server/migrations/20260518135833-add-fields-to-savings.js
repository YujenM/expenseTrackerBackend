"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Savings", "monthly_installment", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("Savings", "total_deposited", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    });
    await queryInterface.addColumn("Savings", "maturity_amount", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("Savings", "status", {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "active",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Savings", "monthly_installment");
    await queryInterface.removeColumn("Savings", "total_deposited");
    await queryInterface.removeColumn("Savings", "maturity_amount");
    await queryInterface.removeColumn("Savings", "status");
  },
};
