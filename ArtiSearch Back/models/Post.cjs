const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    imagen: { type: String, trim: true }, // URL o path de la imagen
    fechaPublicacion: { type: Date, default: Date.now },
    ubicacion: { type: String, required: true, trim: true } // Ubicación del artista al hacer el post
});

module.exports = mongoose.model('Post', PostSchema);
