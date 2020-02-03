module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {      
      username: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,        
        defaultValue: Sequelize.literal("NOW()")
      }
    });    
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accounts');
  }
}
