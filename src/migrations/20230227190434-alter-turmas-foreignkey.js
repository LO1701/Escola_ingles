'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('turmas', 'docente_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Pessoas', key: 'id'}
    });
    await queryInterface.addColumn('turmas', 'nivel_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Niveis', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('turmas', 'docente_id');
    await queryInterface.removeColumn('turmas', 'nivel_id');
  }
};
