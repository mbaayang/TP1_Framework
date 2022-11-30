 const mongoose = require('mongoose');

const objectShema = new mongoose.Schema({
    prenom:{type: String, required: true},
    nom:{type: String, required: true},
    email:{type: String, required: true},
    tel:{type: Number, required: true},
/*     role:{type: String, required: true}, */
});

module.exports = mongoose.model('personnes', objectShema); 