"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserViewHistory", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
      },
      movieID: {
        type: Sequelize.STRING,
      },
      movieTitle: {
        type: Sequelize.STRING,
      },
      movieSlug: {
        type: Sequelize.STRING,
      },
      moviePoster: {
        type: Sequelize.STRING,
      },
      watchedAt: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("UserViewHistory");
  },
};
