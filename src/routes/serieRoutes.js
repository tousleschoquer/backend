const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieControllers');

// Route pour récupérer toutes les séries
router.get('/', serieController.getAllSeries);

// Route pour créer une nouvelle série
router.post('/', serieController.createSerie);

// Route pour obtenir une série par son ID
router.get('/:id', serieController.getSerieById);

// Route pour mettre à jour une série existante
router.put('/:id', serieController.updateSerie);

// Route pour supprimer une série existante
router.delete('/:id', serieController.deleteSerie);

module.exports = router;
