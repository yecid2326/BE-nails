const { Schema, model } = require( 'mongoose' );

const ServiceSchema = new Schema({
    // Define las propiedades de la Entidad
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    urlImage:String,
    userId:{
        type: String,
        required: true
    }
}, {
    // Define las configuraciones que deseamos para aplicar a este objeto en Mongoose 
    timestamps: true    // Crea 2 campos, (Fecha Creacion, Fecha de Actualizacion)
});

// Crea el modelo a partir del Schema
const ServiceModel = model( 
    'Service',          // Nombre de la Entidad (Collection) 
    ServiceSchema       // Estructura de la Entidad
);


module.exports = ServiceModel;

