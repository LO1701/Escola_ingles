const dataBase = require("../models");

class NivelController{
    static async buscaNiveis(req, res) {
        try {
            const todosNiveis = await dataBase.Niveis.findAll();
            res.status(200).json(todosNiveis);
        } catch (error) {
            res.status(500).send(`Erro ao procurar os niveis - ${error.message}`);
        }
    }

    static async buscaNivelId(req, res) {
        try {
            const id = req.params.id;

            const NivelProcurado = await dataBase.Niveis.findOne({
                where: {
                    id: id
                }
            });

            if(NivelProcurado)
                return res.status(200).json(NivelProcurado);
            else
                return res.status(500).send('Nível não encontrado');
            
        } catch (error) {
            res.status(500).send(`Erro ao encontrar o nível - ${error.message}`);
        }
    }

    static async criaNivel(req, res) {
        try {
            const novoNivel = req.body;

            const procuraNivel = await dataBase.Niveis.findOne({
                where: {
                    descricao_niveis: novoNivel.descricao_niveis
                }
            });

            if(procuraNivel)
                return res.status(400).send('Nível já cadastrado');

            const novoNivelCriado = await dataBase.Niveis.create(novoNivel);

            return res.status(200).send(`Nível ${novoNivel.descricao_niveis} criado com sucesso`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar o nível - ${error.message}`);
        }

    }

    static async atualizaNivel(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.id;

        try {
            await dataBase.Niveis.update(novasInformacoes, {
                where: {
                    id: id
                }
            });
    
            const procuraNivel = await dataBase.Niveis.findOne({
                where:{
                    id: id
                }
            });
    
            res.status(200).json(procuraNivel);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar o nível - ${error.message}`);
        }
    }

    static async deletaNivel(req, res) {
        try {
            const id = req.params.id;

            const nivelProcurado = await dataBase.Niveis.findOne({
                where: {
                    id: id
                }
            });

            if(!nivelProcurado)
                return res.status(500).send('Nível não encontrado');

            await dataBase.Niveis.destroy({
                where: {
                    id: id
                }
            });
            
            return res.status(200).send('Nível deletado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o nível - ${error.message}`);
        }
    }

    static async restauraNivel(req, res) {
        const id = req.params.id;

        try {
            await dataBase.Niveis.restore({
                where: {
                    id: Number(id)
                }
            });
    
            res.status(200).json({msg: 'Nível restaurado com sucesso'});
        } catch (error) {
            res.status(500).send(`Erro ao restaurar o nível - ${error.message}`);
        }
    }
}

module.exports = NivelController