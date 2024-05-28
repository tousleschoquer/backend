const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

// Définition du schéma de l'utilisateur
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required : false},
  locked: { type: Boolean, required: false }
});

// static signup method
// static signup method
userSchema.statics.signup = async function(username, email, password, admin = false) {

    // validation
    if (!username || !email || !password) {
        throw Error('Tous les champs doivent être complétés');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email non valide');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Mot de passe pas assez puissant');
    }
    
    const exists = await this.findOne({ email });
  
    if (exists) {
        throw Error('Email déjà utilisé');
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const user = await this.create({ username, email, password: hash, admin });
  
    return user;
  }
  

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
      throw Error('Tous les champs doivent être complétés');
  }

  const user = await this.findOne({ email });

  if (!user) {
      throw Error('Email incorrect');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
      throw Error("Mot de passe incorrect");
  }

  return user;
}

module.exports = mongoose.model('User', userSchema);