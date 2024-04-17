const { Router } = require( 'express' );
const { login, register, renewToken } = require('../controllers/auth.controller');
const { authUser } = require('../middlewares/validate-user.middleware');

const router = Router();

// http://localhost:4000/api/auth/
router.post( '/login', login );         // http://localhost:4000/api/auth/login
router.post( '/register', register );   // http://localhost:4000/api/auth/register
router.get( '/renew-token', authUser, renewToken );  // http://localhost:4000/api/auth/renew-token


module.exports = router;