 const mongoose = require('mongoose');
 const uniqueValidator = require('mongoose-unique-validator');

const objectShema = new mongoose.Schema({
    prenom:{type: String, required: true},
    nom:{type: String, required: true},
    role:{type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    imageUrl:{type: String, required: false},
}, { timestamps: true });

objectShema.plugin(uniqueValidator);
module.exports = mongoose.model('personnes', objectShema); 