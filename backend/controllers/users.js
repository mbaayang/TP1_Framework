const bcrypt = require('bcrypt');
const Object = require('../models/object');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
    const users = new Object({
        prenom: req.body.prenom,
        nom: req.body.nom,
        role: req.body.role,
        email: req.body.email,
        password: hash,
        imageUrl: req.body.imageUrl,
      });
      users.save()
      .then(()=> res.status(201).json({message: 'Inscription réussi !'}))
      .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({ error }));
}

exports.login = (req,res, next) => {
  Object.findOne({email: req.body.email})
  .then(user => {
    if (user === null){
      res.status(401).json({message: 'Compte non existant'});
    }else{
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid){
          res.status(401).json({message: 'Compte non existant'});
        }else{
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              'RANDOM TOKEN_SECRET',
              { expiresIn: '24h'}
            )
          });
        }
      })
      .catch(error => {
        res.status(500).json({ error })
      })
    }
  })
  .catch(error => {
    res.status(500).json({ error });
  })
}

exports.getAllUser = (req, res, next) => {
    Object.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
};

exports.getUserId = async(req, res, next) => {
    await Object.findById(req.params.id)
      .then(users => res.status(200).json(users))
      .catch(error => res.status(404).json({ error }));
  };

exports.deleteUser = async (req, res, next) => {
    await Object.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json({ message: 'Suppréssion réussi !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.updateUser = async (req, res, next) => {
    await Object.findByIdAndUpdate(req.params.id)
      .then(() => res.status(200).json({ message: 'User modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };