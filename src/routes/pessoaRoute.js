const express = require('express');
const PessoaController  = require('../controllers/pessoaController.js');

const pessoaRoute = express.Router();

pessoaRoute
    .get('/pessoas', PessoaController.buscaPessoasAtivas)
    .get('/pessoas/:id', PessoaController.buscaPessoaId)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', PessoaController.deletaPessoa)
    .get('/pessoas/:idEstudante/matricula/:idMatricula', PessoaController.buscaMatriculaId)
    .post('/pessoas/:idEstudante/matricula', PessoaController.criaMatricula)
    .put('/pessoas/:idEstudante/matricula/:idMatricula', PessoaController.atualizaMatricula)
    .delete('/pessoas/:id/matricula/:idMatricula', PessoaController.deletaMatricula);

module.exports = pessoaRoute