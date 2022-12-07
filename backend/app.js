const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* app.use((req, res) => {
    res.json({ message: 'Votre requete a bien ete reçu'});
});
 */


module.exports = app;