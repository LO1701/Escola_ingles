import express from "express";
import * as dotenv from 'dotenv'
import routePessoa from "./src/routes/pessoaRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => console.log('Servidor rodando na porta http://localhost:5000'))

app.use(routePessoa);
