// const dataBase = require("../models");
const { Op } = require("sequelize");
const { TurmasServices } = require('../services'); // aqui não tem nada pq esta utilizando o index.js do services
const turmasServices = new TurmasServices();

class TurmaController{
    static async buscaTurmas(req, res) {

        const where = {};
        const { data_inicio, data_final } = req.query;

        if(data_inicio || data_final){
            where.data_inicio = {};
            where.data_inicio[Op.gte] = data_inicio;
            where.data_inicio[Op.lte] = data_final;
        }

        try {
            const todasTurmas = await turmasServices.pegaRegistros(where);
            res.status(200).json(todasTurmas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as turmas - ${error.message}`);
        }
    }

    static async buscaTurmaId(req, res) {
        try {
            const id = req.params.id;

            const turmaProcurada = await turmasServices.pegaUmRegistroId(id);

            if(turmaProcurada)
                return res.status(200).json(turmaProcurada);
            else
                return res.status(500).send('Turma não encontrada');
        } catch (error) {
            res.status(500).send(`Erro ao encontrar a turma - ${error.message}`);
        }
    }

    static async criaTurma(req, res) {
        try {
            const novaTurma = req.body;

            await turmasServices.criaNovoRegistro(novaTurma);

            return res.status(200).send(`Turma criado com sucesso, data de início em ${novaTurma.data_inicio}`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar a turma - ${error.message}`);
        }

    }

    static async atualizaTurma(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.id;

        try {
            await turmasServices.atualizaRegistro(id, novasInformacoes);
    
            const procuraTurma = await turmasServices.pegaUmRegistroId(id);
    
            res.status(200).json(procuraTurma);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar a turma - ${error.message}`);
        }
    }

    static async deletaTurma(req, res) {
        try {
            const id = req.params.id;

            const TurmaProcurada = turmasServices.pegaUmRegistroId(id);

            if(!TurmaProcurada)
                return res.status(500).send('Turma não encontrada');

            await turmasServices.excluiRegistro(id);
            
            return res.status(200).send('Turma deletada com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar a turma - ${error.message}`);
        }
    }

    static async restauraTurma(req, res) {
        const id = req.params.id;

        try {
            await turmasServices.restauraRegistro(id);
    
            res.status(200).json({msg: 'Turma restaurado com sucesso'});
        } catch (error) {
            res.status(500).send(`Erro ao restaurar a turma - ${error.message}`);
        }
    }
}

module.exports = TurmaController