const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
  prenom: {
    type: String
  },
  nom: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String
  },
  password: {
    type: String
  },
  photo: {
    type: String
  }
}, {
  collection: 'yaram'
})
module.exports = mongoose.model('yaram', User)