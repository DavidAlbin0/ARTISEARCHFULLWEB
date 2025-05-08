const mongoose = require("mongoose");

const ContratoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: "Artista", required: true },
    fechaInicio: { type: String, required: true, default: new Date().toISOString().split("T")[0] },
    fechaFin: { type: String }, // Se actualizará automáticamente si el estado cambia
    detalles: { type: String },
    fechaEstimadaFin: { type: String }, 
    estado: { 
        type: String,
        enum: ["Pendiente", "Aceptado", "En Proceso", "Rechazado", "En proceso de cancelacion", "Finalizado", "Cancelado", "En proceso de devolución"],
        default: "Pendiente"
    },
    monto: {type: Number, required: true, min: 0 }
});

// Middleware para actualizar fechaFin automáticamente si estado cambia a "Finalizado" o "Rechazado"
ContratoSchema.pre("save", function (next) {
    if (this.isModified("estado") && (this.estado === "Finalizado" || this.estado === "Rechazado")) {
        this.fechaFin = new Date().toISOString().split("T")[0]; // Guarda solo la fecha en formato YYYY-MM-DD
    }
    next();
});


module.exports = mongoose.model("Contrato", ContratoSchema);
