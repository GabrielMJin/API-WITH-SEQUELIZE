const { Router } = require('express');
const investidorController = require('../controllers/investidor');

const router = Router();

router.post('/investidor', investidorController.create);
router.get('/investidor', investidorController.findAll);
router.get('/investidor/:id', investidorController.findById);
router.put('/investidor/:id', investidorController.update);
router.delete('/investidor/:id', investidorController.delete);
router.post('/login', investidorController.login);
router.get('/investidor/:id/relatorio', investidorController.relatorio);

module.exports = router;
