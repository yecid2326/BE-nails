const { compareSync } = require("bcrypt");

const UserModel = require("../models/User");

const { findUserByUsername, registerUser } = require('../services/auth.service');
const { generateToken } = require("../helpers/jwt.helper");


const register = async ( req, res ) => {
    console.log( 'REGISTRANDO...' )

    // req.body: { username: '', password: '', role: '' }
    const { username } = req.body;        // Equivale a: const inputData = req.body;  inputData.username

    // 1. Verificar si existe el usuario --> username (email) 
    const userFound = await findUserByUsername( username );         // Equivale a: UserModel.find({ username: username });  
    
    if( userFound ) {
        return res.status( 200 ).json({
            ok: false,
            msg: 'El usuario ya existe!'
        });
    }
    
    registerUser( req.body );

    // (Opcional). Generar JSONWebToken (Si y solo si queremos que al registrarse ingrese al sistema )
    // Responder al cliente 
    res.status( 201 ).json({
        ok: true,
        msg: 'Usuario registrado exitosamente'
    }); 
}

const login = async ( req, res ) => {
    // 1. Obtener los datos requeridos por el login
    const { username, password } = req.body;         // { 'username': '', password: '', role: '' }

    // 2. Verificar si el usuario existe (username ==> email)
    const userFound = await findUserByUsername( username );

    if( ! userFound ) {
        return res.status( 400 ).json({
            ok: false,
            msg: 'El usuario no existe! Por favor registrese.'
        });
    }

    // 3. Confirmar que el password es correcto 
    const isValidPassword = compareSync( password, userFound.password );

    if( ! isValidPassword ) {
        return res.status( 400 ).json({
            ok: false,
            msg: 'Password invalido'
        });
    }

    // userFound: Objeto JavaScript Mongoose, no se puede eliminar sus propiedades como normalmente lo hariamos con un Onjeto JavaScript
    // { _id: '', username: '', name: '', password: '', role: '', createAt: '', updateAt: '', __v: '' }
    const userData = userFound.toObject();  // Convierte un objeto de Monogoose a un Objeto Literal
    delete userData.password;               // Elimina la propiedad password

    // { _id: '', username: '', name: '', role: '' }
    console.log( userData );

    // 4. Generar una autenticacion pasiva (token)
    const payload = { ...userData };       // uid, username, name, role (Desestructurando objeto userData)

    const token = generateToken( payload );

    // 5. Responder al Cliente enviandole el Token
    res.status( 200 ).json({
        ok: true,
        token
    });
}

const renewToken = ( req, res ) => {
    const userData = req.authUser;
    const { id } = userData;

    // Elimina las propiedades adicionales agregadas en el Token
    delete userData.iat;
    delete userData.exp;

    // Verificar que existe el usuario
    const userFound = UserModel.findById( id );
    
    if( ! userFound ) {
        res.status( 400 ).json({
            ok: false,
            msg: 'El usuario no existe, no renueva el token'
        });
    }

    // Generar nuevo token
    const newToken = generateToken({ ...userData });    // uid, username, name, role (Desestructurando objeto userData)

    res.status( 200 ).json({ 
        ok: true,
        token: newToken,
        userData
    });
}



module.exports = {
    login,
    register,
    renewToken
}