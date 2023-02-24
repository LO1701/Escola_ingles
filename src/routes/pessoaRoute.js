const express = require('express');
const PessoaController  = require('../controllers/pessoaController.js');

const pessoaRoute = express.Router();

pessoaRoute
    .get('/pessoas', PessoaController.buscaPessoas)
    .get('/pessoas/:id', PessoaController.buscaPessoaId)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', PessoaController.deletaPessoa);

module.exports = pessoaRoute