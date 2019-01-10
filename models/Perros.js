const mongoose = require('mongoose');
const { Schema } = mongoose;

const perroSchema = new Schema({
	nombre: String,
	raza: {
		type: String,
		default: 'Solobino'
	},
	edad: Number,
	vacunas: {
		tetanos: String,
		rabia: String
	}
});

mongoose.model('perros', perroSchema);