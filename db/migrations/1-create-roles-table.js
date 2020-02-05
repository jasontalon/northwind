const { DataTypes } = require("sequelize");
module.exports = {
  /**
   * @typedef {import('sequelize').Sequelize} Sequelize
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("roles", {
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      level: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    });

    return Promise.resolve();
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("roles");
  }
};
