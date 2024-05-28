const Category = require('../models/category');

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir une catégorie par son ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une catégorie existante
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une catégorie existante
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
