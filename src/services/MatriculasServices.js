const Services = require("./Services");
const dataBase = require("../models");
const sequelize = require("sequelize");

class MatriculasServices extends Services{
    constructor(){
        super('Matriculas');
    }

    // Métodos específicos do controlador de Matriculas

    async procuraMatriculasPorTurma(id) {         //Função agregadora
        return await dataBase[this.nomeDoModelo].findAndCountAll({
            where: {
                turma_id: Number(id),
                status: 'confirmado'
            },
            order: [['createdAt', 'ASC']]
        });
    }

    async procuraTurmasLotadas(lotacaoTurma) {
        return await dataBase[this.nomeDoModelo].findAndCountAll({
            where: {
                status: 'confirmado'
            },
            attributes: ['turma_id'], 
            group: ['turma_id'],
            having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) //assim que se escreve sql
        });
    }
}

module.exports = MatriculasServices;