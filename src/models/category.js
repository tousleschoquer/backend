const mongoose = require('mongoose');

// Définition du schéma de la série
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Création du modèle Serie à partir du schéma
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

