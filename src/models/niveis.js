const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveis extends Model {

    static associate(models) {
      Niveis.hasMany(models.Turmas, {
        foreignKey: 'nivel_id'
      });
    }
  }
  Niveis.init({
    descricao_niveis: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Niveis',
    paranoid: true,
  });
  return Niveis;
};