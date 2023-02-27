'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('matriculas', 'estudante_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Pessoas', key: 'id'}
    });
    await queryInterface.addColumn('matriculas', 'turma_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {model: 'Turmas', key: 'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('matriculas', 'estudante_id');
    await queryInterface.removeColumn('matriculas', 'turma_id');
  }
};
