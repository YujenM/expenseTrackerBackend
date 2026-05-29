"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Providers",
      [
        {
          id: 1,
          name: "Cash",
          type: "cash",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1777701954/expense-tracker/1777701950452-ruppes.png.png",
          createdAt: new Date("2026-05-02T06:05:53.813Z"),
          updatedAt: new Date("2026-05-02T06:05:53.813Z"),
        },
        {
          id: 2,
          name: "Esewa",
          type: "digital",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1777701980/expense-tracker/1777701977629-download.png.png",
          createdAt: new Date("2026-05-02T06:06:20.618Z"),
          updatedAt: new Date("2026-05-02T06:06:20.618Z"),
        },
        {
          id: 3,
          name: "SCb",
          type: "bank",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1777876408/expense-tracker/1777876407353-scb-removebg-preview.png.png",
          createdAt: new Date("2026-05-04T06:33:29.484Z"),
          updatedAt: new Date("2026-05-04T06:33:29.484Z"),
        },
        {
          id: 4,
          name: "Everest Bank Limited",
          type: "bank",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1777876463/expense-tracker/1777876461968-everest-removebg-preview.png.png",
          createdAt: new Date("2026-05-04T06:34:23.879Z"),
          updatedAt: new Date("2026-05-04T06:34:23.879Z"),
        },
        {
          id: 5,
          name: "Khalti",
          type: "digital",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1778851952/expense-tracker/1778851951119-khalti-removebg-preview.png.png",
          createdAt: new Date("2026-05-15T13:32:34.163Z"),
          updatedAt: new Date("2026-05-15T13:32:34.163Z"),
        },
        {
          id: 6,
          name: "Nabil",
          type: "bank",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1778851974/expense-tracker/1778851973514-nabil-removebg-preview.png.png",
          createdAt: new Date("2026-05-15T13:32:55.192Z"),
          updatedAt: new Date("2026-05-15T13:32:55.192Z"),
        },
        {
          id: 7,
          name: "Prabhu",
          type: "bank",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1778851997/expense-tracker/1778851996105-prabhu-removebg-preview.png.png",
          createdAt: new Date("2026-05-15T13:33:17.784Z"),
          updatedAt: new Date("2026-05-15T13:33:17.784Z"),
        },
        {
          id: 8,
          name: "Sidhartha",
          type: "bank",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1778852020/expense-tracker/1778852019290-sidhartha.png.png",
          createdAt: new Date("2026-05-15T13:33:40.921Z"),
          updatedAt: new Date("2026-05-15T13:33:40.921Z"),
        },
        {
          id: 9,
          name: "NIMB",
          type: "bank",
          logo_url:
            "https://res.cloudinary.com/dbozigpgf/image/upload/v1778852069/expense-tracker/1778852067885-nimb-removebg-preview.png.png",
          createdAt: new Date("2026-05-15T13:34:30.015Z"),
          updatedAt: new Date("2026-05-15T13:34:30.015Z"),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Providers", null, {});
  },
};
