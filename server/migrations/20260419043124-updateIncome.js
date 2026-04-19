"use strict";

const { type } = require("node:os");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    (await queryInterface.addColumn("Incomes", "isPrimary", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }),
      await queryInterface.addColumn("Incomes", "nextExpectedDate", {
        type: Sequelize.DATE,
        allowNull: true,
      }));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Incomes", "isPrimary");
    await queryInterface.removeColumn("Incomes", "nextExpectedDate");
  },
};
