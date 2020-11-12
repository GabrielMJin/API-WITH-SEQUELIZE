const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Valor extends Model {
        static associate(models) {
            models.Valor.belongsTo(models.Investimento, { as : 'investimento', foreignKey: 'investimentoId' });
        }
    };

    Valor.init({
        valor: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Valor',
    });

    return Valor;
};