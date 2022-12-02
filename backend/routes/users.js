const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/',userCtrl.createUser); 

router.get('/',userCtrl.getAllUser);   

router.get('/:id',userCtrl.getUserId )

module.exports = router;