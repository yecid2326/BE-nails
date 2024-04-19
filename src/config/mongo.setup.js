const { genSaltSync, hashSync } = require( 'bcrypt' );

const UserModel = require( '../models/User' );


const createDefaultUsers = async () => {
    const pass = 'Nailsstudio1.';

    // Encriptar la contrasenia
    const salt = genSaltSync();                 

    try {
        const count = await UserModel.estimatedDocumentCount();
    
        if( count > 0 ) return;

        // Crea usuarios por defecto
        const users = await Promise.all([
            new UserModel({
                name: "Daniel",
                username: "daniel@ns.com",
                password: hashSync( pass, salt ),
                role: 'superadmin'
            }).save(),
            new UserModel({
                name: "Yecid",
                username: "yecid@ns.com",
                password: hashSync( pass, salt ),
                role: 'superadmin'
            }).save(),
            new UserModel({
                name: "Pirlo",
                username: "pirlo@ns.com",
                password: hashSync( pass, salt ),
                role: 'superadmin'
            }).save()
            
        ]);

        console.log( users );

    } 
    catch ( error ) {
        console.error( error );
    }

}

module.exports = {
    createDefaultUsers
}