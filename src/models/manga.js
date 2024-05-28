const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  series: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie', required: true },
  available: { type: Boolean, default: true },
  image: { type: String }
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;