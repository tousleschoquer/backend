const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowControllers');

// Route pour récupérer tous les emprunts
router.get('/', borrowController.getAllBorrows);

// Route pour créer un nouvel emprunt
router.post('/', borrowController.createBorrow);

// Route pour obtenir un emprunt par son ID
router.get('/:id', borrowController.getBorrowById);

// Route pour mettre à jour un emprunt existant
router.put('/:id', borrowController.updateBorrow);

// Route pour supprimer un emprunt existant
router.delete('/:id', borrowController.deleteBorrow);

module.exports = router;
