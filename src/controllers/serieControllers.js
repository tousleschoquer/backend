const Serie = require('../models/serie');

// Récupérer toutes les séries
exports.getAllSeries = async (req, res) => {
  try {
    const series = await Serie.find();
    res.json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle série
exports.createSerie = async (req, res) => {
  const { name, author, category, description } = req.body;
  const newSerie = new Serie({ name, author, category, description });
  
  try {
    const savedSerie = await newSerie.save();
    res.status(201).json(savedSerie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir une série par son ID
exports.getSerieById = async (req, res) => {
  const { id } = req.params;
  try {
    const serie = await Serie.findById(id);
    if (!serie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    res.json(serie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une série existante
exports.updateSerie = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSerie = await Serie.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSerie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    res.json(updatedSerie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une série existante
exports.deleteSerie = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSerie = await Serie.findByIdAndDelete(id);
    if (!deletedSerie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    res.json({ message: 'Série supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
