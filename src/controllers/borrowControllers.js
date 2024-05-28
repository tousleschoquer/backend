const Borrow = require('../models/borrow');

// Récupérer tous les emprunts
exports.getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find();
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouvel emprunt
exports.createBorrow = async (req, res) => {
  const { user, manga, pending } = req.body;
  const newBorrow = new Borrow({ user, manga, pending });
  
  try {
    const savedBorrow = await newBorrow.save();
    res.status(201).json(savedBorrow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir un emprunt par son ID
exports.getBorrowById = async (req, res) => {
  const { id } = req.params;
  try {
    const borrow = await Borrow.findById(id);
    if (!borrow) {
      return res.status(404).json({ message: 'Emprunt non trouvé' });
    }
    res.json(borrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un emprunt existant
exports.updateBorrow = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBorrow = await Borrow.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBorrow) {
      return res.status(404).json({ message: 'Emprunt non trouvé' });
    }
    res.json(updatedBorrow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un emprunt existant
exports.deleteBorrow = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBorrow = await Borrow.findByIdAndDelete(id);
    if (!deletedBorrow) {
      return res.status(404).json({ message: 'Emprunt non trouvé' });
    }
    res.json({ message: 'Emprunt supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
