// const dataBase = require("../models");
// const sequelize = require("sequelize");
const Services = require('../services/Services.js');
const pessoasServices = new Services('Pessoas');

class PessoaController{
    static async buscaPessoasAtivas(req, res) {
        try {
            const todasPessoasAtivas = await pessoasServices.pegaTodosOsRegistros();
            res.status(200).json(todasPessoasAtivas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as pessoas - ${error.message}`);
        }
    }

    static async buscaTodasPessoas(req, res) {
        try {
            const todasPessoas = await dataBase.Pessoas.scope('todos').findAll();
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

    static async buscaMatriculasPessoa(req, res) {
        try {
            const {idEstudante} = req.params;

            const pessoaProcurada = await dataBase.Pessoas.findOne({
                where: {
                    id: idEstudante
                }
            });

            if(!pessoaProcurada)
                return res.status(500).send('Pessoa não encontrada');
                                                            //criei esse método no escopo de associação
            const pessoaMatriculas = await pessoaProcurada.getMatriculasAtivas();

            res.status(200).json(pessoaMatriculas); 
            
        } catch (error) {
            res.status(500).send(`Erro ao encontrar a matricula - ${error.message}`);
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

    static async buscaMatriculasPorTurmas(req, res) {
        const id = req.params.idTurma;

        try {                                                  //Função agregadora
            const matriculasTurmas = await dataBase.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(id),
                    status: 'confirmado'
                },
                order: [['createdAt', 'ASC']]
            });
    
            res.status(200).json(matriculasTurmas);
        } catch (error) {
            res.status(500).send(`Erro - ${error.message}`);
        }
    }

    static async buscaTurmasLotadas(req, res) {
        //const id = req.params.idTurma;

        const lotacaoTurma = 2;

        try {                                                  //Função agregadora
            const turmasLotadas = await dataBase.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'], 
                group: ['turma_id'],
                having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) //assim que se escreve sql
            });

            res.status(200).json(turmasLotadas);
        } catch (error) {
            res.status(500).send(`Erro - ${error.message}`);
        }
    }

    static async cancelaPessoaEMatricula(req, res) {
        const estudanteId = req.params.id;

        try {
            const procuraPessoa = await dataBase.Pessoas.findOne({
                where: {
                    id: estudanteId
                }
            });

            if(!procuraPessoa)
                return res.status(404).json({msg: 'Usuário não encontrado'});

            await dataBase.sequelize.transaction(async transacao => { // caso ocorra algum erro o transaction vai retornar as alterações no bd
                await dataBase.Pessoas.update({ativo: false}, {
                    where: {
                        id: estudanteId
                    }
                }, { transaction: transacao }); 
                await dataBase.Matriculas.update({status: 'cancelado'},{
                    where: {
                        estudante_id: estudanteId
                    }
                }, { transaction: transacao });
            });

            res.status(200).send(`O usuário ${procuraPessoa.nome} foi desativado`);
        } catch (error) {
            
        }
    }
}

module.exports = PessoaController