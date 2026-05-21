"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Savings", "type");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Savings", "type", {
      type: Sequelize.STRING(50),
      allowNull: false,
    });
  },
};
