const models = require('../models');
const validator = require('validator');
const { Sequelize } = require('../models');
const Op = Sequelize.Op;

module.exports = {
    create: async (req, res) => {
        try {
            const investidor = await models.Investidor.create(req.body);
            return res.status(201).json({ investidor });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    findAll: async (req, res) => {
        try {
            const investidores = await models.Investidor.findAll();
            return res.status(200).json({ investidores });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const investidor = await models.Investidor.findOne({
                where: { id: id }
            });
            if (investidor) {
                return res.status(200).json({ investidor });
            }
            return res.status(404).send("Não existe nenhum investidor com o ID especificado.");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const [ updated ] = await models.Investidor.update(req.body, {
                where: { id: id }
            });
            if (updated) {
                const updatedInvestidor = await models.Investidor.findOne({
                    where: { id: id }
                });
                return res.status(200).json({ updatedInvestidor });
            }
            return res.status(404).send("Não existe nenhum investidor com o ID especificado.");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await models.Investidor.destroy({
                where: { id: id }
            });
            if (deleted) {
                return res.status(204).send("Investidor deletado.");
            }
            return res.status(404).send("Não existe nenhum investidor com o ID especificado.");
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
    login: async (req, res) => {
        try{
            const cpf = req.body.cpf;
            const senha = req.body.senha;

            if(validator.isIn(cpf, [1,2,3,4,5,6,7,8,9,0]) == true || cpf.length != 11 ){
                return res.status(404).send("CPF invalido");
            }
            const investidor = await models.Investidor.findOne({
                where: {
                    [Op.and]: [{cpf:cpf}, {senha: senha}]
                }
            });
            if(investidor) {
                return res.status(200).json({investidor});
            }
            return res.status(404).send("CPF ou Senha incorreto");
        } catch(error){
            return res.status(500).send(error.message);
        }
    },
    relatorio: async (req, res) => {
        try{
            const {id} = req.params;
            const relatorio = await models.Investidor.findOne({where:{id:id},
                include: [{
                    model: models.Investimento,
                    as: 'investimentos',
                    include: [{
                        model: models.Valor,
                        as: 'valores'
                    }]
                }]
            })
            if(relatorio){
                return res.status(200).json({relatorio});
            }
            return res.status(404).send("Não existe investidor com o ID especificado");
        }catch (error) {
            return res.status(500).send(error.message);
        }
    }
}
