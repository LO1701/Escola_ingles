// const dataBase = require("../models");
// const sequelize = require("sequelize");

const { PessoasServices, MatriculasServices } = require('../services'); // aqui não tem nada pq esta utilizando o index.js do services
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController{
    static async buscaPessoasAtivas(req, res) {
        try {
            const todasPessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            res.status(200).json(todasPessoasAtivas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as pessoas - ${error.message}`);
        }
    }

    static async buscaTodasPessoas(req, res) {
        try {
            const todasPessoas = await pessoasServices.pegaTodosOsRegistros(null, 'todos');
            res.status(200).json(todasPessoas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as pessoas - ${error.message}`);
        }
    }

    static async buscaPessoaId(req, res) {
        try {
            const id = req.params.id;

            const pessoaProcurada = await pessoasServices.pegaUmRegistroId(id)

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

            const procuraPessoa = await pessoasServices.procuraEmail({email: novaPessoa.email});

            if(procuraPessoa)
                return res.status(400).send('Email já cadastrado');

            await pessoasServices.criaNovoRegistro(novaPessoa);

            return res.status(200).send(`Usuario ${novaPessoa.nome} criado com sucesso`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar o usuário - ${error.message}`);
        }

    }

    static async atualizaPessoa(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.id;

        try {
            await pessoasServices.atualizaRegistro(id, novasInformacoes);
    
            const procuraPessoa = await pessoasServices.pegaUmRegistroId(id);
    
            res.status(200).json(procuraPessoa);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar o usuário - ${error.message}`);
        }
    }

    static async deletaPessoa(req, res) {
        try {
            const id = req.params.id;

            const pessoaProcurada = pessoasServices.pegaUmRegistroId(id);

            if(!pessoaProcurada)
                return res.status(500).send('Usuario não encontrado');

            await pessoasServices.excluiRegistro(id);
            
            return res.status(200).send('Usuario deletado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o usuário - ${error.message}`);
        }
    }

    static async restauraPessoa(req, res) {
        const id = req.params.id;

        try {
            await pessoasServices.restauraRegistro(id);

            res.status(200).json({msg: 'Usuário restaurado com sucesso'}); 
        } catch (error) {
            res.status(500).send(`Erro ao restaurar o usuário - ${error.message}`);
        }
        
    }

    static async buscaMatriculasPessoa(req, res) {
        try {
            const {idEstudante} = req.params;

            const pessoaProcurada = await pessoasServices.pegaUmRegistroId(idEstudante);

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

            const matriculaProcurada = await matriculasServices.pegaUmRegistroId(idMatricula);

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

            await matriculasServices.criaNovoRegistro(novaMatricula);

            return res.status(200).send(`Matricula criada com sucesso`);
        } catch (error) {
            res.status(500).send(`Erro ao cadastrar a matricula - ${error.message}`);
        }

    }

    static async atualizaMatricula(req, res) {
        const novasInformacoes = req.body;
        const id = req.params.idMatricula;

        try {
            await matriculasServices.atualizaRegistro(id, novasInformacoes);
    
            const procuraMatricula = await matriculasServices.pegaUmRegistroId(id)
    
            res.status(200).json(procuraMatricula);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar a matrícula - ${error.message}`);
        }
    }

    static async deletaMatricula(req, res) {
        try {
            const id = req.params.idMatricula;

            const pessoaProcurada = await matriculasServices.pegaUmRegistroId(id);

            if(!pessoaProcurada)
                return res.status(500).send('Matrícula não encontrado');

            await matriculasServices.excluiRegistro(id);
            
            return res.status(200).send('Matrícula deletada com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o Matrícula - ${error.message}`);
        }
    }

    static async restauraMatricula(req, res) {
        const id = req.params.idMatricula;

        try {
            await matriculasServices.restauraRegistro(id);
    
            res.status(200).json({msg: 'Matrícula restaurada com sucesso'});
        } catch (error) {
            res.status(500).send(`Erro ao restaurar a Matrícula - ${error.message}`);
        }
    }

    static async buscaMatriculasPorTurmas(req, res) {
        const id = req.params.idTurma;

        try {                                                  
            const matriculasTurmas = await matriculasServices.procuraMatriculasPorTurma(id);
    
            res.status(200).json(matriculasTurmas);
        } catch (error) {
            res.status(500).send(`Erro - ${error.message}`);
        }
    }

    static async buscaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;

        try {                                                  
            const turmasLotadas = await matriculasServices.procuraTurmasLotadas(lotacaoTurma);

            res.status(200).json(turmasLotadas);
        } catch (error) {
            res.status(500).send(`Erro - ${error.message}`);
        }
    }

    static async cancelaPessoaEMatricula(req, res) {
        const estudanteId = req.params.id;

        try {
            const procuraPessoa = await pessoasServices.pegaUmRegistroId(estudanteId);

            if(!procuraPessoa)
                return res.status(404).json({msg: 'Usuário não encontrado'});

            pessoasServices.cancelaPessoaEMatriculas(estudanteId);

            res.status(200).send(`O usuário ${procuraPessoa.nome} foi desativado`);
        } catch (error) {
            
        }
    }
}

module.exports = PessoaController