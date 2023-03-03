const express = require('express');
const PessoaController  = require('../controllers/pessoaController.js');

const pessoaRoute = express.Router();

pessoaRoute
    .get('/pessoas', PessoaController.buscaPessoasAtivas)
    .get('/pessoas/todos', PessoaController.buscaTodasPessoas)
    .get('/pessoas/:id', PessoaController.buscaPessoaId)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', PessoaController.deletaPessoa)
    .post('/pessoas/:id', PessoaController.restauraPessoa)
    .get('/pessoas/:idEstudante/matricula', PessoaController.buscaMatriculasPessoa)
    .get('/pessoas/:idEstudante/matricula/:idMatricula', PessoaController.buscaMatriculaId)
    .post('/pessoas/:idEstudante/matricula', PessoaController.criaMatricula)
    .put('/pessoas/:idEstudante/matricula/:idMatricula', PessoaController.atualizaMatricula)
    .delete('/pessoas/:id/matricula/:idMatricula', PessoaController.deletaMatricula)
    .post('/pessoas/:id/matricula/:idMatricula', PessoaController.restauraMatricula);

module.exports = pessoaRoute