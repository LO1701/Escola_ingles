import Pessoas from "../models/pessoas.js";

class PessoaController{
    static async mostraPessoas(req, res) {
        try {
            const pessoas = await Pessoas.findAll();
            console.log('aqiii');
            res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).send(`Erro ao procurar as pessoas ${error.mensage}`);
        }
    }
}

export default PessoaController