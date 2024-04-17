const { validateToken } = require('../helpers/jwt.helper');


const authUser = ( req, res, next ) => {
    // console.log( 'Hola soy el Middleware de Autenticacion :)' );
    
    // 1. Obtener el token del header y validar que existe
    const token = req.header( 'X-Token' );

    if( ! token ) {
        return res.json({
            ok: false,
            msg: 'Error al obtener el Token'
        });
    }

    
    try {
        // 2. Verificar que el token es autentico (es decir, fue generado por nosotros)
        // 3. Extraer el username (email) y el _id ( ID ) para verificar que el usuario esta registrado
        const payload = validateToken( token );

                                    // 4. Enviar el ID usuario al controlador para registrar
        req.authUser = payload;     //    Pasamos los datos al controlador entregandole los valores al objeto Request

        next();
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}


module.exports = {
    authUser
}