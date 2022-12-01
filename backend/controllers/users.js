const Object = require('../models/object')

exports.createUser = (req, res, next) => {
    const users = new Object({
        ...req.body
      });
      users.save()
      .then(()=> res.status(201).json({message: 'Inscription réussi !'}))
      .catch(error => res.status(400).json({error}));
};

exports.getAllUser = (req, res, next) => {
    Object.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
}