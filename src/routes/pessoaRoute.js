import express from 'express';
import PessoaController from '../controllers/pessoaController.js';

const route = express.Router();

route
    .get('/pessoas', PessoaController.mostraPessoas)

export default route;