const express = require('express');
const TurmaController  = require('../controllers/turmaController.js');

const turmaRoute = express.Router();

turmaRoute
    .get('/turmas', TurmaController.buscaTurmas)
    .get('/turmas/:id', TurmaController.buscaTurmaId)
    .post('/turmas', TurmaController.criaTurma)
    .put('/turmas/:id', TurmaController.atualizaTurma)
    .delete('/turmas/:id', TurmaController.deletaTurma)
    .post('/turmas/:id', TurmaController.restauraTurma);

module.exports = turmaRoute