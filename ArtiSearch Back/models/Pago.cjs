const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
    contrato: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrato', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    monto: { type: Number, required: true, min: 0 }, // Monto pagado
    metodoPago: { 
        type: String, 
        enum: ['Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Transferencia Bancaria', 'Pendiente'], 
        required: true, 
        default: 'Pendiente'
    },
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Completado', 'Fallido', 'Reembolsado'], 
        default: 'Pendiente' 
    },
    fechaPago: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pago', PagoSchema);
