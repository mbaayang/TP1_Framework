 const mongoose = require('mongoose');

const objectShema = new mongoose.Schema({
    prenom:{type: String, required: false},
    nom:{type: String, required: false},
    email:{type: String, required: false},
    role:{type: String, required: false},
    imageUrl:{type: String, required: false},
    password:{}
});

module.exports = mongoose.model('personnes', objectShema); 