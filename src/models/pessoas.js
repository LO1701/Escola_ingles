const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {

    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: {   //nome disso é escopo de associação
          status: 'confirmado'
        }, as: 'matriculasAtivas' //utiliza assim dai await pessoaProcurada.getMatriculasAtivas() no controller
      });
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate:{
        funcaoValidadora: function (dado) {
          if(dado.length < 3)
            throw new Error ('O campo nome é inválido');
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: 'E-mail inválido'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        validaRole: function(role){
          if(role !== 'estudante' && (role !== 'professor' && role !== 'professora') && role !== 'admin')
            throw new Error ('Permissão inválida');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {  //esse daqui é o padrão
      where:{
        ativo: true
      }
    },
    scopes:{//posso utilizar quantos escopos eu precisar
      todos:{
        where:{}
      }
      //etc....
    }
  });
  return Pessoas;
};