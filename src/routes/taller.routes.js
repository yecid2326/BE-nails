const { Router } = require( 'express' );
const { authUser } = require('../middlewares/validate-user.middleware');
const { createTaller, getTaller, getTallerById, removeTallerById, updateTallerById } = require('../controllers/taller.controller');
const router = Router();




router.post('/', authUser, createTaller );
router.get('/', getTaller);
router.get('/:id', getTallerById);
router.delete('/:id', authUser, removeTallerById);
router.patch('/:id', authUser, updateTallerById);

module.exports = router;