module.exports = {
  /**
   * @typedef {import('sequelize').Sequelize} Sequelize
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   * @param {QueryInterface} queryInterface
   * * @param {Sequelize} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    const rows = [
      ["admin", 10],
      ["user", 1],
      ["anon", 0]
    ]
      .map(([role, level]) => ` select '${role}', ${level} `)
      .join("union");
    const query = `insert into roles ${rows}`;
    console.log(query);
    await queryInterface.sequelize.query(query);

    return Promise.resolve();
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("DELETE FROM roles");
    return Promise.resolve();
  }
};
