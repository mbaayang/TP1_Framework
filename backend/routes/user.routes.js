const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const userRoute = express.Router();
const jwt = require('jsonwebtoken');
let User = require('../model/User');
// Add User
userRoute.route('/add-user').post((req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const users = new User({
      prenom: req.body.prenom,
      nom: req.body.nom,
      role: req.body.role,
      email: req.body.email,
      password: hash,
      imageUrl: req.body.imageUrl
    });
    users.save()
    .then(()=> res.status(201).json({message: 'Inscription réussi !'}))
    .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(400).json({ error }));
});
//Connexion
/* userRoute.route('/login').post((req,res, next) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user === null){
      res.status(401).json({message: 'Paire email/mot de passe incorrect'});
    }else{
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid){
          res.status(401).json({message: 'Paire email/mot de passe incorrect'});
        }else{
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id},'RANDOM TOKEN_SECRET',{ expiresIn: '24h'})
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
}) */
// Get all User
userRoute.route('/').get((req, res, next) => {
    User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get User
userRoute.route('/read-user/:id').get((req, res,next) => {
    User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User
userRoute.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Modification réussie !')
    }
  })
})
// Delete User
userRoute.route('/delete-user/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = userRoute;