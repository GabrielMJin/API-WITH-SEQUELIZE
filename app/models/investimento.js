const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Investimento extends Model {
        static associate(models) {
            models.Investimento.belongsTo(models.Investidor, { as : 'investidor', foreignKey: 'investidorId' });
            models.Investimento.hasMany(models.Valor, { as : 'valores', foreignKey: 'investimentoId' });
        }
    };

    Investimento.init({
        nome: DataTypes.STRING,
        benchmark: DataTypes.STRING,
        tipo_investimento: DataTypes.STRING,
        quantidade_papeis: DataTypes.INTEGER,
        valor_papel: DataTypes.DOUBLE,
        montante_investido: DataTypes.DOUBLE,
        indice: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Investimento',
    });

    return Investimento;
};