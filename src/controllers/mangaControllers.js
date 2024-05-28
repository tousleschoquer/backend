const Manga = require('../models/manga');

// Récupérer tous les mangas
exports.getAllMangas = async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau manga
exports.createManga = async (req, res) => {
  const { title, series, available, image } = req.body;
  const newManga = new Manga({ title, series, available, image });
  
  try {
    const savedManga = await newManga.save();
    res.status(201).json(savedManga);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir un manga par son ID
exports.getMangaById = async (req, res) => {
  const { id } = req.params;
  try {
    const manga = await Manga.findById(id).populate({
      path: 'series',
      populate: {
        path: 'category'
      }
    });
    if (!manga) {
      return res.status(404).json({ message: 'Manga non trouvé' });
    }
    res.json(manga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un manga existant
exports.updateManga = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedManga = await Manga.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedManga) {
      return res.status(404).json({ message: 'Manga non trouvé' });
    }
    res.json(updatedManga);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un manga existant
exports.deleteManga = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedManga = await Manga.findByIdAndDelete(id);
    if (!deletedManga) {
      return res.status(404).json({ message: 'Manga non trouvé' });
    }
    res.json({ message: 'Manga supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer tous les mangas ou les mangas par série
exports.getAllMangas = async (req, res) => {
  const { serie } = req.query;
  let filter = {};
  if (serie) {
    filter = { series: serie };
  }
  try {
    const mangas = await Manga.find(filter);
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandomManga = async (req, res) => {
  try {
    console.log('Counting mangas...');
    const count = await Manga.countDocuments();
    console.log(`Total mangas: ${count}`);
    if (count === 0) {
      console.log('No mangas found.');
      return res.status(404).json({ message: 'Aucun manga trouvé' });
    }
    const random = Math.floor(Math.random() * count);
    console.log(`Random index: ${random}`);
    const manga = await Manga.findOne().skip(random);
    if (!manga) {
      console.log('Manga not found.');
      return res.status(404).json({ message: 'Manga non trouvé' });
    }
    console.log('Manga found:', manga);
    res.json(manga);
  } catch (err) {
    console.error('Erreur lors de la récupération d\'un manga aléatoire:', err);
    res.status(500).json({ message: err.message });
  }
};

const updateRecommendations = async (req, res) => {
  try {
    const { mangaIds } = req.body;
    // Save mangaIds to the database as recommendations
    // Example: await Database.saveRecommendations(mangaIds);
    res.status(200).json({ message: 'Recommendations updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update recommendations.' });
  }
};

const updateNewReleases = async (req, res) => {
  try {
    const { mangaIds } = req.body;
    // Save mangaIds to the database as new releases
    // Example: await Database.saveNewReleases(mangaIds);
    res.status(200).json({ message: 'New releases updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update new releases.' });
  }
};

