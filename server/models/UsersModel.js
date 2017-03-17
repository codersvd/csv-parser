const mongoose = require('mongoose');
const uuid = require('node-uuid');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    id: {
        type: String,
        lowercase: true,
        trim: true,
        default: function () {
            return uuid.v4();
        }
    },
    firstname: {
        type: String,
        trim: true,
        max: 70
    }, surname: {
        type: String,
        trim: true,
        max: 70
    }, email: {
        type: String,
        index: true,
        unique: true,
        /*validate: {
            validator: () => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: 'Please fill a valid email address'
        }*/
    }
}, {timestamps: true});

UsersSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;