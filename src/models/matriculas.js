'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    static associate(models) {
      Matriculas.belongsTo(models.Pessoas, {
        foreignKey: 'estudante_id'
      });
      Matriculas.belongsTo(models.Turmas, {
        foreignKey: 'turma_id'
      });
    }
  }
  Matriculas.init({
    status: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Matriculas',
    paranoid: true,
  });
  return Matriculas;
};