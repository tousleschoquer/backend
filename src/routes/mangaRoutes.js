const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaControllers');

// Route pour récupérer tous les mangas ou les mangas par série
router.get('/', mangaController.getAllMangas);

// Route pour créer un nouveau manga
router.post('/', mangaController.createManga);

// Route pour obtenir un manga par son ID
router.get('/:id', mangaController.getMangaById);

// Route pour obtenir un manga aléatoire
router.get('/random', mangaController.getRandomManga);  // Nouvelle route

// Route pour mettre à jour un manga existant
router.put('/:id', mangaController.updateManga);

// Route pour supprimer un manga existant
router.delete('/:id', mangaController.deleteManga);

router.get('/search', async (req, res) => {
    try {
      const title = req.query.title;
      const mangas = await Manga.find({ title: { $regex: title, $options: 'i' } });
      res.json(mangas);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la recherche des mangas', error });
    }
  });
  
  // Routes pour les mangas populaires et les nouveautés
  router.get('/popular', async (req, res) => {
    try {
      const mangas = await Manga.find({ /* critère de popularité */ });
      res.json(mangas);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des mangas populaires', error });
    }
  });
  
  router.get('/new', async (req, res) => {
    try {
      const mangas = await Manga.find({ /* critère de nouveauté */ });
      res.json(mangas);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des nouveautés', error });
    }
  });
  
  module.exports = router;