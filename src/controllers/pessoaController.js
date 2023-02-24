const pessoas = require("../models");

class PessoaController{
    static async buscaPessoas(req, res) {
        try {
            const todasPessoas = await pessoas.Pessoas.findAll();
            res.status(200).json(todasPessoas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as pessoas - ${error.message}`);
        }
    }

    static async buscaPessoaId(req, res) {
        try {
            const id = req.params.id;

            const pessoaProcurada = await pessoas.Pessoas.findOne({
                where: {
                    id: id
                }
            });

            if(pessoaProcurada)
                return res.status(200).json(pessoaProcurada);
            else
                return res.status(500).send('Usuario não encontrado');
        } catch (error) {
            res.status(500).send(`Erro ao encontrar o usuário - ${error.message}`);
        }
    }

    static async criaPessoa(req, res) {
        try {
            const novaPessoa = req.body;

            const procuraPessoa = await pessoas.Pessoas.findOne({
                where: {
                    email: novaPessoa.email
                }
            });

            if(procuraPessoa)
                return res.status(400).send('Email já cadastrado');

            const novaPessoaCriada = await pessoas.Pessoas.create(novaPessoa);

            return res.status(200).send(`Usuario ${novaPessoa.nome} criado com sucesso`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar o usuário - ${error.message}`);
        }

    }

    static async atualizaPessoa(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.id;

        try {
            await pessoas.Pessoas.update(novasInformacoes, {
                where: {
                    id: id
                }
            });
    
            const procuraPessoa = await pessoas.Pessoas.findOne({
                where:{
                    id: id
                }
            });
    
            res.status(200).json(procuraPessoa);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar o usuário - ${error.message}`);
        }
    }

    static async deletaPessoa(req, res) {
        try {
            const id = req.params.id;

            const pessoaProcurada = await pessoas.Pessoas.findOne({
                where: {
                    id: id
                }
            });

            if(!pessoaProcurada)
                return res.status(500).send('Usuario não encontrado');

            await pessoas.Pessoas.destroy({
                where: {
                    id: id
                }
            });
            
            return res.status(200).send('Usuario deletado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o usuário - ${error.message}`);
        }
    }
}

module.exports = PessoaController