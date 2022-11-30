 const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Object = require('./models/object');

mongoose.connect('mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/User?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/Users',(req, res, next) => {
    const users = new Object({
      ...req.body
    });
    users.save()
    .then(()=> res.status(201).json({message: 'Inscription réussi !'}))
    .catch(error => res.status(400).json({error}));
}); 

  app.use('/Users',(req, res, next) => {
    Object.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
    console.log(Object);
});  

module.exports = app; 