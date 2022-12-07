const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
  prenom: {type: String, required: true},
  nom: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  password: {type: String, required: true},
  etat: {type: Boolean, required: false},
  imageUrl: {type: String, required: false}
}, {timestamps: true},
{
  collection: 'personnes'
})
module.exports = mongoose.model('personnes', User)