const mongoose = require('mongoose');

// Définition du schéma de la série
const serieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String }
});

// Création du modèle Serie à partir du schéma
const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;