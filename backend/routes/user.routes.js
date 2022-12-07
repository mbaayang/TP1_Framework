const express = require('express');
const bcrypt = require('bcrypt');
const userRoute = express.Router();
const jwt = require('jsonwebtoken');
const authorize = require('../middlewares/auth');
const { check, validationResul } = require('express-validator')
const userSchema = require('../model/User');


// Add User
/* userRoute.route('/add-user').post((req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const users = new User({
      prenom: req.body.prenom,
      nom: req.body.nom,
      email: req.body.email,
      role: req.body.role,
      password: hash,
      etat: req.body.etat,
      imageUrl: req.body.imageUrl
    });
    users.save()
    .then(()=> res.status(201).json({message: "Inscription reussie!"}))
    .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(400).json({ error }));
}); */

userRoute.post('/add-user', [
  check('nom').not().isEmpty(),
  check('prenom').not().isEmpty(),
  check('email', 'Email est requis').not().isEmpty(),
  check('password', 'Le mot de passe doit être compris entre 8 et 16 caractères')
  .not()
  .isEmpty()
  .isLength({ min: 8, max: 16 }),
],
(req, res, next) => {
  const errors = validationResult(req)
  console.log(req.body)

  /* if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array())
  } else { */
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new userSchema({
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        role: req.body.role,
        password: hash,
        etat:req.body.etat,
        imageUrl: req.body.imageUrl,
      })
      user
          .save()
          .then((response) => {
            res.status(201).json({
              message: 'Incription réussie !',
              result: response,
            })
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            })
          })
        })
      },
    )

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
userRoute.post('/login', (req, res, next) => {
  let getUser
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      }
      getUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '1h',
        },
      )
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: getUser._id,
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Authentication failed',
      })
    })
})

// Get all User
userRoute.route('/').get((req, res, next) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get User
userRoute.route('/read-user/:id').get((req, res,next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single User
userRoute.route('/user-profile/:id').get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
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