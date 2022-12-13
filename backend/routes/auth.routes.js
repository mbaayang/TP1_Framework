const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../models/User')
const authorize = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')
mongoose = require('mongoose')
multer = require('multer')

// Multer File upload settings
const DIR = './images/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  },
})

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
})

// Sign-up
router.post(
  '/register-user', upload.single('imageUrl'),
  [
    check('nom').not().isEmpty(),
    check('prenom').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password should be between 8 to 16 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 16 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    console.log(req.body)

      bcrypt.hash(req.body.password, 10).then((hash) => {

        const url = req.protocol + '://' + req.get('host')
        const user = new userSchema({
          prenom: req.body.prenom,
          nom: req.body.nom,
          email: req.body.email,
          role: req.body.role,
          password: hash,
          etat: req.body.etat,
          imageUrl: url + '/images/' + req.file.filename,
          matricule: req.body.matricule,
        })
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: 'Inscription réussie !',
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


// Sign-in
router.post('/signin', (req, res, next) => {
  let getUser
  userSchema
 /*  userSchema.path('email').validate(() => {
    return true 
  }, 'votre email est incorrect'
  ) */
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'L\'email est incorrect!',
        })
      }
      getUser = user
      return bcrypt.compare(req.body.password, user.password)
    
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Le mot de passe est incorrect!',
        })
      }
      
        else if(getUser.etat==true){
          return res.status(401).json({
            message: 'le compte n\'existe pas',
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

// Get Users
router.route('/').get((req, res, next) => {
  userSchema.find((error, response)=> {
    if (error) {
      return next(error)
    } else {
      return res.status(200).json(response)
    }
  })
})


// Get User
router.route('/read-user/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});




// Get Single User
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
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
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Modification réussie !')
      }
    },
  )
})

// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
