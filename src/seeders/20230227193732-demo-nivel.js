'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Niveis', [
			{
				descricao_niveis: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				descricao_niveis: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				descricao_niveis: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			} 
	  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Niveis', null, {});
  }
};
