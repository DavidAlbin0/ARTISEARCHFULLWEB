const mongoose = require('mongoose');

const CalificacionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    calif: { type: Number, required: true, min: 1, max: 5 }, // 1 a 5 estrellas
    comentario: { type: String, trim: true },
    imagen: {type: String },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calificacion', CalificacionSchema);
