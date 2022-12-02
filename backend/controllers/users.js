const Object = require('../models/object')

exports.createUser = (req, res, next) => {
    const users = new Object({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        role: req.body.role,
        imageUrl: req.body.imageUrl,
        password: req.body.password
      });
      users.save()
      .then(()=> res.status(201).json({message: 'Inscription réussi !'}))
      .catch(error => res.status(400).json({error}));
};

exports.getAllUser = (req, res, next) => {
    Object.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
};

exports.getUserId = (req, res, next) => {
    Object.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(users))
      .catch(error => res.status(404).json({ error }));
  }