'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'department', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'last_name', {
      type: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
