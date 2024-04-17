const { genSaltSync, hashSync } = require( 'bcrypt' );

const UserModel = require("../models/User");

function registerUser ( newUser ) {
    // Si no existe. Creamos el usuario
    const dbUser = new UserModel( newUser );

    // Encriptar la contrasenia
    const salt = genSaltSync();                 
    dbUser.password = hashSync( newUser.password, salt );

    dbUser.save();
}

async function findUserByUsername( username ) {

    return await UserModel.findOne({ username }, {
        // Restricciones: No retornar las siguientes propiedades y sus valores
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    });         // Equivale a: UserModel.find({ username: username });  
}


module.exports = {
    registerUser,
    findUserByUsername
}