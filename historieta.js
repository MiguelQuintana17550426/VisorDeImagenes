const mongoose = require('mongoose');

const historietaSchema = new mongoose.Schema({
    nombre: String,
    extension: String
});

const Historieta = mongoose.model('historieta', historietaSchema);

module.exports = Historieta;
