module.exports = {
  /**
   * @typedef {import('sequelize').Sequelize} Sequelize
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   * @param {QueryInterface} queryInterface
   * * @param {Sequelize} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      userid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      passwordHash: {
        type: Sequelize.STRING
      },
      passwordSalt: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      refreshToken: {
        type: Sequelize.STRING,
        unique: true
      },
      lastLoginAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
      }
    });

    return Promise.resolve();
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
