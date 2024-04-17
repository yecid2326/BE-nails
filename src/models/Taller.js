const { Schema, model } = require('mongoose');

const TallerSchema = new Schema({
    //definimos propiedades de la entidad taller
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    pirce: {
        type: Number,
        default: 0
    },
    urlImage: String,
    userId:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const TallerModel = model(
    'taller',
    TallerSchema
);

module.exports = TallerModel;