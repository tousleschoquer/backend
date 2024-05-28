const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  manga: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true }],
  pending: { type: Boolean ,default: true }
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;