const dataBase = require("../models");
const { Op } = require("sequelize");
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
            const todasTurmas = await dataBase.Turmas.findAll({ where });
            res.status(200).json(todasTurmas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as turmas - ${error.message}`);
        }
    }

    static async buscaTurmaId(req, res) {
        try {
            const id = req.params.id;

            const turmaProcurada = await dataBase.Turmas.findOne({
                where: {
                    id: id
                }
            });

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

            await dataBase.Turmas.create(novaTurma);

            return res.status(200).send(`Turma criado com sucesso, data de início em ${novaTurma.data_inicio}`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar a turma - ${error.message}`);
        }

    }

    static async atualizaTurma(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.id;

        try {
            await dataBase.Turmas.update(novasInformacoes, {
                where: {
                    id: id
                }
            });
    
            const procuraTurma = await dataBase.Turmas.findOne({
                where:{
                    id: id
                }
            });
    
            res.status(200).json(procuraTurma);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar a turma - ${error.message}`);
        }
    }

    static async deletaTurma(req, res) {
        try {
            const id = req.params.id;

            const TurmaProcurada = await dataBase.Turmas.findOne({
                where: {
                    id: id
                }
            });

            if(!TurmaProcurada)
                return res.status(500).send('Turma não encontrada');

            await dataBase.Turmas.destroy({
                where: {
                    id: id
                }
            });
            
            return res.status(200).send('Turma deletada com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar a turma - ${error.message}`);
        }
    }

    static async restauraTurma(req, res) {
        const id = req.params.id;

        try {
            await dataBase.Turmas.restore({
                where: {
                    id: Number(id)
                }
            });
    
            res.status(200).json({msg: 'Turma restaurado com sucesso'});
        } catch (error) {
            res.status(500).send(`Erro ao restaurar a turma - ${error.message}`);
        }
    }
}

module.exports = TurmaController