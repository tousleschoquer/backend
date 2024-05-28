const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');

// Route pour récupérer toutes les catégories
router.get('/', categoryController.getAllCategories);

// Route pour créer une nouvelle catégorie
router.post('/', categoryController.createCategory);

// Route pour obtenir une catégorie par son ID
router.get('/:id', categoryController.getCategoryById);

// Route pour mettre à jour une catégorie existante
router.put('/:id', categoryController.updateCategory);

// Route pour supprimer une catégorie existante
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
