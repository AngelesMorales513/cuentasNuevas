const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    NumCuenta: { type: Number, required: true},
    nombreCli: { type: String, required: true},
    banco: { type: String, required: true},
    saldo: { type: Number, required: true},
    description: { type: String, required: true},

    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Note', NoteSchema)