const express = require('express');
const pessoaRoute = require('./src/routes/pessoaRoute.js');
const nivelRoute = require('./src/routes/nivelRoute.js');
const turmaRoute = require('./src/routes/turmaRoute.js');
require('dotenv').config();

const app = express();
app.use(
    express.json(),
    pessoaRoute,
    nivelRoute,
    turmaRoute
);
app.listen(process.env.PORT, () => console.log('Servidor rodando na porta http://localhost:5000'));