const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// roles válidos

var roleValidos = {
    values : [ "ADMIN_ROLE" ,"USER_ROLE"] ,
    message: "No es un role válido"
};

const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es requerido']
        },

        email: {
            type: String,
            unique: true,
            required: [true, 'El email es requerido']
        },

        password: {
            type: String,
            required: [true, 'El password es requerido']
        },

        img: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true,
            default: 'USER_ROLE',
            enum: roleValidos
        }
    }
);

usuarioSchema
    .plugin(
        uniqueValidator,
        { message: 'debe ser único' });

const User = module.exports = mongoose.model('Usuario', usuarioSchema);