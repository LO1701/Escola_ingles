const express = require('express');
const NivelController  = require('../controllers/nivelController.js');

const nivelRoute = express.Router();

nivelRoute
    .get('/niveis', NivelController.buscaNiveis)
    .get('/niveis/:id', NivelController.buscaNivelId)
    .post('/niveis', NivelController.criaNivel)
    .put('/niveis/:id', NivelController.atualizaNivel)
    .delete('/niveis/:id', NivelController.deletaNivel);

module.exports = nivelRoute