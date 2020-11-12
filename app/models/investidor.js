const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Investidor extends Model {
        static associate(models) {
            models.Investidor.hasMany(models.Investimento, { as : 'investimentos', foreignKey: 'investidorId' });
        }
    };

    Investidor.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        senha: DataTypes.STRING,
        idade: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Investidor',
    });

    return Investidor;
};