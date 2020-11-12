const models = require('../models');

module.exports = {
    create: async(req, res) => {
        try{
            const investimento = await models.Investimento.create(req.body);
            return res.status(201).json({ investimento });

        } catch(error) {
            return res.status(500).json({ error: error.message});
        }
    },
    findAll: async (req, res) => {
        try{
            const investimentos = await models.Investimento.findAll();
            return res.status(200).json({ investimentos});
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    findById: async (req, res) => {
        try{
            const {id} = req.params;
            const investimento = await models.Investimento.findOne({
                where: {id: id}
            });
            if (investimento) {
                return res.status(200).json({investimento});
            }
            return res.status(404).send("Não existe nenhum investimento com o id especificado");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    findAllbyInvestidor: async (req, res) => {
        try{
            const {investidorId} = req.params;
            const investimentos = await models.Investimento.findAll({
                where: {investidorId: investidorId}
            });
            if(investimentos){
                return res.status(200).json({investimentos});
            }
            return res.status(404).send("Não existe investimentos com o id do usuário especificado");
        } catch(error){
            return res.status(500).send(error.message);
        }
    },
    update: async (req, res)=> {
        try{
            const {id} = req.params;
            const [updated] = await models.Investimento.update(req.body, { where: {id:id}});
        
            if (updated) {
                const updatedInvestimento = await models.Investimento.findOne({ where: {id: id}});
                return res.status(200).json({updatedInvestimento});
            }
            return res.status(404).send("Não existe nenhum investimento com o ID especificado");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    delete: async (req, res) => {
        try{
            const {id} = req.params;
            const deleted = await models.Investimento.destroy({
                where: {id:id}
            });
            if (deleted) {
                return res.status(204).send("investimento deletado");
            }
            return res.status(404).send("Não existe nenhum investimento com o ID especificado");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    findValores: async (req, res) => {
        try {
            const { id } = req.params;
            const valores = await models.Valor.findAll({
                where: { investimentoId: id }
            });
            return res.status(200).json({ valores });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
    modificarValor: async (req, res) => {
        try {
            const { id } = req.params;
            const { novoValor } = req.body;
            const valor = await models.Valor.create({
                investimentoId: id,
                valor: novoValor
            });
            return res.status(200).json({ valor });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}