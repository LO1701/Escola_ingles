const dataBase = require('../models');

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo;
    }

    async criaNovoRegistro(dados) {
        return await dataBase[this.nomeDoModelo].create(dados);
    }

    async pegaTodosOsRegistros() {
        return await dataBase[this.nomeDoModelo].findAll();
    }

    async pegaRegistroUnico(where) {
        return await dataBase[this.nomeDoModelo].findOne({
            where: {
                ...where
            }
        });
    }

    async pegaRegistros(where) {
        return await dataBase[this.nomeDoModelo].findAll({
            where: {
                ...where
            }
        });
    }

    async pegaUmRegistroId (id) {
        return await dataBase[this.nomeDoModelo].findOne({
            where: {
                id: id
            }
        });
    }

    async atualizaRegistro(id, dados, transacao = {}) {
        return await dataBase[this.nomeDoModelo].update(dados, {
            where: {
                id: id
            }},
            transacao
        );
    }

    async atualizaRegistros(dados, where, transacao = {}) {
        return await dataBase[this.nomeDoModelo].update(dados, {
            where: {
                ...where
            }},
            transacao
        );
    }

    async excluiRegistro(id) {
        await dataBase[this.nomeDoModelo].destroy({
            where: {
                id: id
            }
        });
    }

    async restauraRegistro(id){
        await dataBase[this.nomeDoModelo].restore({
            where: {
                id: Number(id)
            }
        });
    }
}

module.exports = Services;