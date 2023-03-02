const dataBase = require("../models");
class PessoaController{
    static async buscaPessoasAtivas(req, res) {
        try {
            const todasPessoas = await dataBase.Pessoas.findAll({
                where:{
                    ativo: true
                }
            });
            res.status(200).json(todasPessoas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as pessoas - ${error.message}`);
        }
    }

    static async buscaPessoaId(req, res) {
        try {
            const id = req.params.id;

            const pessoaProcurada = await dataBase.Pessoas.findOne({
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

            const procuraPessoa = await dataBase.Pessoas.findOne({
                where: {
                    email: novaPessoa.email
                }
            });

            if(procuraPessoa)
                return res.status(400).send('Email já cadastrado');

            const novaPessoaCriada = await dataBase.Pessoas.create(novaPessoa);

            return res.status(200).send(`Usuario ${novaPessoa.nome} criado com sucesso`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar o usuário - ${error.message}`);
        }

    }

    static async atualizaPessoa(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.id;

        try {
            await dataBase.Pessoas.update(novasInformacoes, {
                where: {
                    id: id
                }
            });
    
            const procuraPessoa = await dataBase.Pessoas.findOne({
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

            const pessoaProcurada = await dataBase.Pessoas.findOne({
                where: {
                    id: id
                }
            });

            if(!pessoaProcurada)
                return res.status(500).send('Usuario não encontrado');

            await dataBase.Pessoas.destroy({
                where: {
                    id: id
                }
            });
            
            return res.status(200).send('Usuario deletado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o usuário - ${error.message}`);
        }
    }

    static async restauraPessoa(req, res) {
        const id = req.params.id;

        try {
            await dataBase.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            });

            res.status(200).json({msg: 'Usuário restaurado com sucesso'}); 
        } catch (error) {
            res.status(500).send(`Erro ao restaurar o usuário - ${error.message}`);
        }
        
    }

    static async buscaMatriculaId(req, res) {
        try {
            const {idEstudante, idMatricula} = req.params;

            const matriculaProcurada = await dataBase.Matriculas.findOne({
                where: {
                    estudante_id: idEstudante,
                    id: idMatricula
                }
            });

            if(matriculaProcurada)
                return res.status(200).json(matriculaProcurada);
            else
                return res.status(500).send('Matrícula não encontrada');

        } catch (error) {
            res.status(500).send(`Erro ao encontrar a matricula - ${error.message}`);
        }
    }

    static async criaMatricula(req, res) {
        try {
            const id = req.params.idEstudante;
            const novaMatricula = { ...req.body, estudante_id: Number(id)};

            await dataBase.Matriculas.create(novaMatricula);

            return res.status(200).send(`Matricula criada com sucesso`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar a matricula - ${error.message}`);
        }

    }

    static async atualizaMatricula(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.idMatricula;

        try {
            await dataBase.Matriculas.update(novasInformacoes, {
                where: {
                    id: id
                }
            });
    
            const procuraMatricula = await dataBase.Matriculas.findOne({
                where:{
                    id: id
                }
            });
    
            res.status(200).json(procuraMatricula);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar a matrícula - ${error.message}`);
        }
    }

    static async deletaMatricula(req, res) {
        try {
            const id = req.params.idMatricula;

            const pessoaProcurada = await dataBase.Matriculas.findOne({
                where: {
                    id: id
                }
            });

            if(!pessoaProcurada)
                return res.status(500).send('Matrícula não encontrado');

            await dataBase.Matriculas.destroy({
                where: {
                    id: id
                }
            });
            
            return res.status(200).send('Matrícula deletada com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o Matrícula - ${error.message}`);
        }
    }

    static async restauraMatricula(req, res) {
        const id = req.params.idMatricula;

        try {
            await dataBase.Matriculas.restore({
                where: {
                    id: Number(id)
                }
            });
    
            res.status(200).json({msg: 'Matrícula restaurada com sucesso'});
        } catch (error) {
            res.status(500).send(`Erro ao restaurar a Matrícula - ${error.message}`);
        }
    }
}

module.exports = PessoaController