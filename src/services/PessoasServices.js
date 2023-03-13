const Services = require("./Services");
const dataBase = require("../models");

class PessoasServices extends Services{
    constructor(){
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    // Métodos específicos do controlador de pessoas

    async pegaRegistrosAtivos( where = {}){
        return dataBase[this.nomeDoModelo].findAll({ 
            where: {
                ...where
            }
        });
    }

    async pegaTodosOsRegistros( where = {}, scope ) {
        return dataBase[this.nomeDoModelo].scope(`${scope}`).findAll({
            where: {
                ...where
            }
        });
    }

    async procuraEmail( where = {}){
        return await dataBase[this.nomeDoModelo].findOne({ 
            where: {
                ...where
            }
        });
    }

    async cancelaPessoaEMatriculas(estudanteId){
        return await dataBase.sequelize.transaction(async transacao => { // caso ocorra algum erro o transaction vai retornar as alterações no bd
            await super.atualizaRegistro(estudanteId, {ativo: false}, { transaction: transacao }); 
            await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: estudanteId}, { transaction: transacao });
        });
    }
}

module.exports = PessoasServices;