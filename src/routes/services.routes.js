const { Router } = require('express'); // Importa el Router de Express

const { authUser } = require('../middlewares/validate-user.middleware');
const {
  createService,
  getServices,
  updateServiceById,
  removeServiceById,
  getServiceById,
} = require('../controllers/service.controller');

const { validate } = require('../models/Service');

const router = Router(); // Invoca el Router de Express

router.get('/:id', getServiceById);
router.get('/', getServices);
router.post('/', authUser, createService); // post crea recursos (verbo HTTP)
router.delete('/:id', authUser, removeServiceById);
router.patch('/:id', authUser, updateServiceById);

module.exports = router; // Expone el router para que sea usado por otros archivos
