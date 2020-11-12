const { Router } = require('express');
const investimentoController = require('../controllers/investimento');
const router = Router();

router.post('/investimento', investimentoController.create);
router.get('/investimento', investimentoController.findAll);
router.get('/investimento/:id', investimentoController.findById);
router.put('/investimento/:id', investimentoController.update);
router.delete('/investimento/:id', investimentoController.delete);
router.get('/investimento/:id/valores', investimentoController.findValores);
router.post('/investimento/:id/modificar_valor', investimentoController.modificarValor);
router.get('/investimento/:investidorId/investimentos', investimentoController.findAllbyInvestidor);

module.exports = router;