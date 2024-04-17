const { sign, verify } = require("jsonwebtoken");


const generateToken = ( payload ) => {
    return sign(
        payload,                            // PayLoad
        process.env.SECRET_JWT_SEED,        // PALABRA-CLAVE
        { expiresIn: '1h' }                 // Configuracion
    );
}

const validateToken = ( token ) => {
    return verify(
        token,                          // Token
        process.env.SECRET_JWT_SEED     // PALABRA CLAVE
    );
}


module.exports = {
    generateToken,
    validateToken
}