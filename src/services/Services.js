const dataBase = require('../models');

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros() {
        return dataBase[this.nomeDoModelo].findAll();
    }
}

module.exports = Services;