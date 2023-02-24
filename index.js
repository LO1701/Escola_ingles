const express = require('express');
const pessoaRoute = require('./src/routes/pessoaRoute.js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => console.log('Servidor rodando na porta http://localhost:5000'))

app.use(pessoaRoute);
