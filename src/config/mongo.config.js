const mongoose = require( 'mongoose' );


const dbConection = async () => {

    try {
        await mongoose.connect( process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log( 'Base de datos inicializada correctamente' );
    }
    catch( error ) {
        console.error( error );
        throw new Error( 'Error al inicializar la base de datos' );
    }

}


module.exports = {
    dbConection
};